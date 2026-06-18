import { NextResponse } from "next/server";
import {
  isMembershipTierId,
  membershipTiers,
} from "@/lib/membership/tiers";
import { sendMembershipConfirmation } from "@/lib/email/sendMembershipConfirmation";
import { verifyRazorpayPaymentSignature } from "@/lib/payments/razorpay";
import { getSupabaseServer } from "@/lib/supabase/server";

type VerifyPaymentBody = {
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  razorpay_signature?: unknown;
  tierId?: unknown;
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  city?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function trimString(value: string) {
  return value.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyPaymentBody;

    if (
      !isNonEmptyString(body.razorpay_order_id) ||
      !isNonEmptyString(body.razorpay_payment_id) ||
      !isNonEmptyString(body.razorpay_signature) ||
      !isMembershipTierId(body.tierId) ||
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

    const tier = membershipTiers[body.tierId];
    const supabase = getSupabaseServer();
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
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to verify payment. Please contact support." },
      { status: 500 }
    );
  }
}
