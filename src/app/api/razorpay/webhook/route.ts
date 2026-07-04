import { NextResponse } from "next/server";
import { sendPaymentCaptureFailureAlert } from "@/lib/email/sendPaymentCaptureFailureAlert";
import {
  completeMembershipPayment,
  MembershipCompletionError,
} from "@/lib/payments/completeMembershipPayment";
import {
  isMembershipTierId,
  membershipTiers,
} from "@/lib/membership/tiers";
import {
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  verifyRazorpayWebhookSignature,
} from "@/lib/payments/razorpay";

export const runtime = "nodejs";

type RazorpayWebhookEvent = {
  event?: unknown;
  payload?: {
    payment?: {
      entity?: {
        id?: unknown;
        order_id?: unknown;
      };
    };
  };
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getNote(notes: Record<string, string> | undefined, key: string) {
  const value = notes?.[key];
  return typeof value === "string" ? value.trim() : "";
}

function describeError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const webhookEventId = request.headers.get("x-razorpay-event-id");

  if (!signature) {
    console.error("razorpay_webhook_signature_missing", { webhookEventId });
    return NextResponse.json({ error: "Missing webhook signature." }, { status: 401 });
  }

  let signatureValid = false;
  try {
    signatureValid = verifyRazorpayWebhookSignature({ rawBody, signature });
  } catch (error) {
    console.error("razorpay_webhook_configuration_failed", {
      webhookEventId,
      error: describeError(error),
    });
    return NextResponse.json(
      { error: "Webhook verification is not configured." },
      { status: 500 }
    );
  }

  if (!signatureValid) {
    console.error("razorpay_webhook_signature_invalid", { webhookEventId });
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  let event: RazorpayWebhookEvent;
  try {
    event = JSON.parse(rawBody) as RazorpayWebhookEvent;
  } catch (error) {
    console.error("razorpay_webhook_payload_invalid", {
      webhookEventId,
      error: describeError(error),
    });
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  if (event.event !== "payment.captured") {
    return NextResponse.json({ received: true, ignored: true });
  }

  const payloadPayment = event.payload?.payment?.entity;
  const paymentId = isNonEmptyString(payloadPayment?.id)
    ? payloadPayment.id
    : undefined;
  const orderId = isNonEmptyString(payloadPayment?.order_id)
    ? payloadPayment.order_id
    : undefined;
  let tierId: string | undefined;
  let amount: number | undefined;
  let failureStage = "webhook.payment_payload";

  try {
    if (!paymentId || !orderId) {
      throw new Error("Captured payment event is missing payment or order ID.");
    }

    failureStage = "webhook.razorpay_fetch";
    const [payment, order] = await Promise.all([
      fetchRazorpayPayment(paymentId),
      fetchRazorpayOrder(orderId),
    ]);
    amount = Number(payment.amount);

    if (
      payment.status !== "captured" ||
      payment.captured === false ||
      payment.order_id !== orderId ||
      order.status !== "paid"
    ) {
      throw new Error("Razorpay payment or order is not in a completed state.");
    }

    if (payment.currency !== "INR" || order.currency !== "INR") {
      throw new Error("Captured membership payment currency is not INR.");
    }

    const purchaseType = getNote(order.notes, "purchase_type");
    tierId = getNote(order.notes, "membership_tier_id");

    if (purchaseType === "coaching") {
      return NextResponse.json({ received: true, ignored: true });
    }

    if (purchaseType !== "membership" && !tierId) {
      return NextResponse.json({ received: true, ignored: true });
    }

    failureStage = "webhook.membership_metadata";
    if (!isMembershipTierId(tierId)) {
      throw new Error("Captured payment has an invalid membership tier note.");
    }

    const tier = membershipTiers[tierId];
    if (amount !== tier.amount || Number(order.amount) !== tier.amount) {
      throw new Error("Captured payment amount does not match the membership tier.");
    }

    const fullName = getNote(order.notes, "full_name");
    const email = getNote(order.notes, "email");
    const phone = getNote(order.notes, "phone");
    const city = getNote(order.notes, "city");

    if (!fullName || !email || !/^[6-9]\d{9}$/.test(phone) || !city) {
      throw new Error("Captured payment is missing membership recovery metadata.");
    }

    if (
      payment.email &&
      payment.email.trim().toLowerCase() !== email.toLowerCase()
    ) {
      throw new Error("Captured payment email does not match the order metadata.");
    }

    const paymentPhone = payment.contact?.replace(/\D/g, "").slice(-10);
    if (paymentPhone && paymentPhone !== phone) {
      throw new Error("Captured payment phone does not match the order metadata.");
    }

    failureStage = "webhook.membership_completion";
    const result = await completeMembershipPayment({
      source: "webhook",
      tierId,
      fullName,
      email,
      phone,
      city,
      message: null,
      orderId,
      paymentId,
      activatedAt: payment.created_at
        ? new Date(payment.created_at * 1000)
        : new Date(),
    });

    console.info("razorpay_webhook_membership_processed", {
      webhookEventId,
      paymentId,
      orderId,
      tierId,
      membershipId: result.membershipId,
      created: result.created,
    });

    return NextResponse.json({
      received: true,
      membershipId: result.membershipId,
      created: result.created,
    });
  } catch (error) {
    const stage =
      error instanceof MembershipCompletionError ? error.stage : failureStage;
    console.error("razorpay_captured_payment_processing_failed", {
      webhookEventId,
      paymentId,
      orderId,
      tierId,
      amount,
      stage,
      error: describeError(error),
    });

    try {
      await sendPaymentCaptureFailureAlert({
        source: "webhook",
        stage,
        paymentId,
        orderId,
        tierId,
        amount,
        webhookEventId,
        error,
      });
    } catch (alertError) {
      console.error("membership_payment_failure_alert_failed", {
        source: "webhook",
        webhookEventId,
        paymentId,
        orderId,
        stage,
        error: describeError(alertError),
      });
    }

    return NextResponse.json(
      { error: "Captured payment could not be processed." },
      { status: 500 }
    );
  }
}
