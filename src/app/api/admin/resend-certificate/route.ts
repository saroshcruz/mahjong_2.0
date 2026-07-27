import { NextResponse } from "next/server";

import { isDashboardRequestAuthorized } from "@/lib/api/internalApiAuth";
import { sendMembershipConfirmation } from "@/lib/email/sendMembershipConfirmation";
import { getSupabaseServer } from "@/lib/supabase/server";

type ResendCertificateBody = {
  memberId?: unknown;
};

function isValidMemberId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= 128
  );
}

export async function POST(request: Request) {
  if (!isDashboardRequestAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized request." },
      { status: 401 },
    );
  }

  let body: ResendCertificateBody;

  try {
    body = (await request.json()) as ResendCertificateBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!isValidMemberId(body.memberId)) {
    return NextResponse.json(
      { error: "A valid member ID is required." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseServer();
    const { data: member, error } = await supabase
      .from("members")
      .select(
        "full_name, email, membership_tier, membership_id, razorpay_payment_id, amount_paid",
      )
      .eq("id", body.memberId.trim())
      .maybeSingle();

    if (error) {
      console.error("Certificate resend member lookup failed", {
        memberId: body.memberId,
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        { error: "Unable to retrieve the member." },
        { status: 500 },
      );
    }

    if (!member) {
      return NextResponse.json(
        { error: "Member not found." },
        { status: 404 },
      );
    }

    await sendMembershipConfirmation({
      to: member.email,
      name: member.full_name,
      membershipTier: member.membership_tier,
      membershipId: member.membership_id,
      paymentId: member.razorpay_payment_id,
      amountPaid: member.amount_paid,
    });

    console.info("Membership certificate resent", {
      memberId: body.memberId,
      membershipId: member.membership_id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Certificate resend failed", {
      memberId: body.memberId,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: "Unable to resend the certificate." },
      { status: 500 },
    );
  }
}
