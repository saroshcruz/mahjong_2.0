import "server-only";

import { sendMembershipConfirmation } from "@/lib/email/sendMembershipConfirmation";
import { sendRegistrationAdminNotification } from "@/lib/email/sendRegistrationAdminNotification";
import {
  isMembershipTierId,
  membershipTiers,
  type MembershipTierId,
} from "@/lib/membership/tiers";
import { getSupabaseServer } from "@/lib/supabase/server";

type MembershipCompletionSource = "browser" | "webhook";

type CompleteMembershipPaymentInput = {
  source: MembershipCompletionSource;
  tierId: MembershipTierId;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  message?: string | null;
  orderId: string;
  paymentId: string;
  activatedAt?: Date | string;
};

export class MembershipCompletionError extends Error {
  stage: string;

  constructor(stage: string, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "MembershipCompletionError";
    this.stage = stage;
  }
}

function structuredLog(
  level: "info" | "error",
  event: string,
  details: Record<string, unknown>
) {
  console[level](event, details);
}

export async function completeMembershipPayment({
  source,
  tierId,
  fullName,
  email,
  phone,
  city,
  message,
  orderId,
  paymentId,
  activatedAt = new Date(),
}: CompleteMembershipPaymentInput) {
  if (!isMembershipTierId(tierId)) {
    throw new MembershipCompletionError(
      "membership.validation",
      "Invalid membership tier."
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const submittedMessage = message?.trim() || null;
  const tier = membershipTiers[tierId];
  const supabase = getSupabaseServer();
  const { data: existingMember, error: existingMemberError } = await supabase
    .from("members")
    .select("membership_id")
    .eq("razorpay_payment_id", paymentId)
    .maybeSingle();

  if (existingMemberError) {
    throw new MembershipCompletionError(
      "member.lookup_by_payment",
      "Unable to check whether the payment was already processed.",
      { cause: existingMemberError }
    );
  }

  if (existingMember?.membership_id) {
    structuredLog("info", "membership_payment_already_processed", {
      source,
      paymentId,
      orderId,
      membershipId: existingMember.membership_id,
    });

    return {
      membershipId: existingMember.membership_id,
      created: false,
    };
  }

  const { data: memberWithEmail, error: memberWithEmailError } = await supabase
    .from("members")
    .select("membership_id, razorpay_payment_id")
    .eq("email", normalizedEmail)
    .eq("payment_status", "paid")
    .limit(1)
    .maybeSingle();

  if (memberWithEmailError) {
    throw new MembershipCompletionError(
      "member.lookup_by_email",
      "Unable to check existing membership status.",
      { cause: memberWithEmailError }
    );
  }

  if (memberWithEmail?.membership_id) {
    throw new MembershipCompletionError(
      "member.duplicate_email",
      `Email already belongs to ${memberWithEmail.membership_id} with a different payment.`
    );
  }

  const { data: member, error: insertError } = await supabase
    .from("members")
    .insert({
      full_name: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      city: city.trim(),
      membership_tier: tier.name,
      message: submittedMessage,
      payment_status: "paid",
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      amount_paid: tier.amount,
    })
    .select("membership_id")
    .single();

  if (insertError?.code === "23505") {
    const { data: concurrentMember, error: concurrentLookupError } = await supabase
      .from("members")
      .select("membership_id")
      .eq("razorpay_payment_id", paymentId)
      .maybeSingle();

    if (!concurrentLookupError && concurrentMember?.membership_id) {
      structuredLog("info", "membership_payment_concurrent_duplicate", {
        source,
        paymentId,
        orderId,
        membershipId: concurrentMember.membership_id,
      });

      return {
        membershipId: concurrentMember.membership_id,
        created: false,
      };
    }
  }

  if (insertError || !member?.membership_id) {
    throw new MembershipCompletionError(
      "member.insert",
      "Payment was verified, but the member record could not be saved.",
      { cause: insertError ?? undefined }
    );
  }

  structuredLog("info", "membership_payment_completed", {
    source,
    paymentId,
    orderId,
    membershipId: member.membership_id,
    tierId,
  });

  try {
    const customerEmail = await sendMembershipConfirmation({
      to: normalizedEmail,
      name: fullName.trim(),
      membershipTier: tier.name,
      membershipId: member.membership_id,
      paymentId,
      amountPaid: tier.amount,
      joinedAt: activatedAt,
    });
    structuredLog("info", "membership_confirmation_email_sent", {
      source,
      paymentId,
      membershipId: member.membership_id,
      emailId: customerEmail?.id,
    });
  } catch (error) {
    structuredLog("error", "membership_confirmation_email_failed", {
      source,
      paymentId,
      membershipId: member.membership_id,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    const adminEmail = await sendRegistrationAdminNotification({
      type: "membership",
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      city: city.trim(),
      label: tier.name,
      recordId: member.membership_id,
      paymentId,
      amountPaid: tier.amount,
      message: submittedMessage,
      submittedAt: activatedAt,
    });
    if (adminEmail) {
      structuredLog("info", "membership_admin_notification_sent", {
        source,
        paymentId,
        membershipId: member.membership_id,
        emailId: adminEmail.id,
      });
    }
  } catch (error) {
    structuredLog("error", "membership_admin_notification_failed", {
      source,
      paymentId,
      membershipId: member.membership_id,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  return {
    membershipId: member.membership_id,
    created: true,
  };
}
