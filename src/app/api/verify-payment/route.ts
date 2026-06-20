import { NextResponse } from "next/server";
import {
  coachingProgrammes,
  isCoachingProgrammeId,
} from "@/lib/coaching/programmes";
import {
  isMembershipTierId,
  membershipTiers,
} from "@/lib/membership/tiers";
import { sendCoachingConfirmation } from "@/lib/email/sendCoachingConfirmation";
import { sendMembershipConfirmation } from "@/lib/email/sendMembershipConfirmation";
import { verifyRazorpayPaymentSignature } from "@/lib/payments/razorpay";
import { getSupabaseServer } from "@/lib/supabase/server";

type VerifyPaymentBody = {
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  razorpay_signature?: unknown;
  purchaseType?: unknown;
  tierId?: unknown;
  programmeId?: unknown;
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  city?: unknown;
  experienceLevel?: unknown;
  message?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function trimString(value: string) {
  return value.trim();
}

function isValidIndianMobileNumber(value: string) {
  return /^[6-9]\d{9}$/.test(value);
}

async function createNextCoachingRegistrationId(
  supabase: ReturnType<typeof getSupabaseServer>
) {
  const prefix = `COACH-${new Date().getFullYear()}-`;
  const { data, error } = await supabase
    .from("coaching_registrations")
    .select("registration_id")
    .like("registration_id", `${prefix}%`)
    .order("registration_id", { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  const latestRegistrationId = data.at(0)?.registration_id;
  const latestSequence = latestRegistrationId?.startsWith(prefix)
    ? Number.parseInt(latestRegistrationId.slice(prefix.length), 10)
    : NaN;
  const nextSequence = Number.isFinite(latestSequence)
    ? latestSequence + 1
    : 100;

  return `${prefix}${String(nextSequence).padStart(4, "0")}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyPaymentBody;
    const purchaseType = body.purchaseType === "coaching" ? "coaching" : "membership";

    if (
      !isNonEmptyString(body.razorpay_order_id) ||
      !isNonEmptyString(body.razorpay_payment_id) ||
      !isNonEmptyString(body.razorpay_signature) ||
      !isNonEmptyString(body.full_name) ||
      !isNonEmptyString(body.email) ||
      !isNonEmptyString(body.phone) ||
      !isNonEmptyString(body.city)
    ) {
      return NextResponse.json(
        { error: "Payment verification details are incomplete." },
        { status: 400 }
      );
    }

    if (purchaseType === "membership" && !isMembershipTierId(body.tierId)) {
      return NextResponse.json(
        { error: "Please select a valid membership tier." },
        { status: 400 }
      );
    }

    if (
      purchaseType === "coaching" &&
      !isCoachingProgrammeId(body.programmeId)
    ) {
      return NextResponse.json(
        { error: "Please select a valid coaching programme." },
        { status: 400 }
      );
    }

    if (!isValidIndianMobileNumber(body.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const verified = verifyRazorpayPaymentSignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });

    if (!verified) {
      return NextResponse.json(
        { error: "Payment verification failed." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    if (purchaseType === "coaching") {
      if (!isCoachingProgrammeId(body.programmeId)) {
        return NextResponse.json(
          { error: "Please select a valid coaching programme." },
          { status: 400 }
        );
      }

      const programme = coachingProgrammes[body.programmeId];
      const registrationId = await createNextCoachingRegistrationId(supabase);
      const { data: coachingRegistration, error: insertError } = await supabase
        .from("coaching_registrations")
        .insert({
          registration_id: registrationId,
          full_name: trimString(body.full_name),
          email: trimString(body.email).toLowerCase(),
          phone: trimString(body.phone),
          city: trimString(body.city),
          experience_level: isNonEmptyString(body.experienceLevel)
            ? trimString(body.experienceLevel)
            : null,
          message: isNonEmptyString(body.message)
            ? trimString(body.message)
            : null,
          programme_name: programme.name,
          payment_status: "paid",
          razorpay_order_id: body.razorpay_order_id,
          razorpay_payment_id: body.razorpay_payment_id,
          amount_paid: programme.amount,
        })
        .select("registration_id")
        .single();

      if (insertError || !coachingRegistration?.registration_id) {
        console.error(insertError);

        return NextResponse.json(
          {
            error:
              "Payment verified, but coaching registration could not be saved.",
          },
          { status: 500 }
        );
      }

      console.info("Coaching registration activated:", {
        registrationId: coachingRegistration.registration_id,
        programme: programme.name,
        paymentId: body.razorpay_payment_id,
      });

      try {
        const email = await sendCoachingConfirmation({
          to: trimString(body.email).toLowerCase(),
          name: trimString(body.full_name),
          registrationId: coachingRegistration.registration_id,
          programmeName: programme.name,
          paymentId: body.razorpay_payment_id,
          amountPaid: programme.amount,
        });
        console.info("Coaching confirmation email sent:", {
          registrationId: coachingRegistration.registration_id,
          emailId: email?.id,
        });
      } catch (emailError) {
        console.error("Coaching confirmation email failed:", emailError);
      }

      return NextResponse.json({
        verified: true,
        paymentId: body.razorpay_payment_id,
        orderId: body.razorpay_order_id,
        registrationId: coachingRegistration.registration_id,
        itemName: programme.name,
      });
    }

    if (!isMembershipTierId(body.tierId)) {
      return NextResponse.json(
        { error: "Please select a valid membership tier." },
        { status: 400 }
      );
    }

    const tier = membershipTiers[body.tierId];
    const membershipActivatedAt = new Date();
    const { data: member, error: insertError } = await supabase
      .from("members")
      .insert({
        full_name: trimString(body.full_name),
        email: trimString(body.email).toLowerCase(),
        phone: trimString(body.phone),
        city: trimString(body.city),
        membership_tier: tier.name,
        payment_status: "paid",
        razorpay_order_id: body.razorpay_order_id,
        razorpay_payment_id: body.razorpay_payment_id,
        amount_paid: tier.amount,
      })
      .select("membership_id")
      .single();

    if (insertError || !member?.membership_id) {
      console.error(insertError);

      return NextResponse.json(
        { error: "Payment verified, but member record could not be saved." },
        { status: 500 }
      );
    }

    console.info("Membership activated:", {
      membershipId: member.membership_id,
      membershipTier: tier.name,
      paymentId: body.razorpay_payment_id,
    });

    try {
      const email = await sendMembershipConfirmation({
        to: trimString(body.email).toLowerCase(),
        name: trimString(body.full_name),
        membershipTier: tier.name,
        membershipId: member.membership_id,
        paymentId: body.razorpay_payment_id,
        amountPaid: tier.amount,
        joinedAt: membershipActivatedAt,
      });
      console.info("Membership confirmation email sent:", {
        membershipId: member.membership_id,
        emailId: email?.id,
      });
    } catch (emailError) {
      console.error("Membership confirmation email failed:", emailError);
    }

    return NextResponse.json({
      verified: true,
      paymentId: body.razorpay_payment_id,
      orderId: body.razorpay_order_id,
      membershipId: member.membership_id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to verify payment. Please contact support." },
      { status: 500 }
    );
  }
}
