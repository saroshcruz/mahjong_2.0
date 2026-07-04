import { membershipTiers, type MembershipTierId } from "@/lib/membership/tiers";
import {
  coachingProgrammes,
  type CoachingProgrammeId,
} from "@/lib/coaching/programmes";
import crypto from "crypto";
import Razorpay from "razorpay";

type RazorpayOrder = {
  id: string;
  amount: number | string;
  currency: string;
  status?: string;
  notes?: Record<string, string>;
};

type RazorpayPayment = {
  id: string;
  amount: number | string;
  currency: string;
  status: string;
  captured?: boolean;
  order_id?: string | null;
  email?: string;
  contact?: string;
  created_at?: number;
};

type MembershipRecoveryMetadata = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
};

export class RazorpayOrderError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "RazorpayOrderError";
    this.status = status;
  }
}

function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  if (!keyId || !keySecret || !publicKeyId) {
    throw new Error("Razorpay credentials are not configured.");
  }

  return { keyId, keySecret, publicKeyId };
}

function getRazorpayClient() {
  const { keyId, keySecret } = getRazorpayCredentials();

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

function truncateRazorpayNote(value: string) {
  return value.trim().slice(0, 256);
}

export async function createRazorpayMembershipOrder(
  tierId: MembershipTierId,
  recoveryMetadata: MembershipRecoveryMetadata
) {
  const tier = membershipTiers[tierId];

  if (tier.amount < 100) {
    throw new RazorpayOrderError("Membership amount must be at least ₹1.", 400);
  }

  const { publicKeyId } = getRazorpayCredentials();
  const razorpay = getRazorpayClient();

  let order: RazorpayOrder;

  try {
    order = (await razorpay.orders.create({
      amount: tier.amount,
      currency: "INR",
      receipt: `ima_${tierId}_${Date.now()}`,
      notes: {
        purchase_type: "membership",
        membership_tier_id: tierId,
        full_name: truncateRazorpayNote(recoveryMetadata.fullName),
        email: truncateRazorpayNote(recoveryMetadata.email.toLowerCase()),
        phone: truncateRazorpayNote(recoveryMetadata.phone),
        city: truncateRazorpayNote(recoveryMetadata.city),
      },
    })) as RazorpayOrder;
  } catch (error) {
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    throw new RazorpayOrderError(
      statusCode === 401
        ? "Razorpay authentication failed."
        : "Unable to create Razorpay order.",
      statusCode === 401 ? 401 : 500
    );
  }

  return {
    keyId: publicKeyId,
    orderId: order.id,
    order_id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    tierName: tier.name,
  };
}

export async function createRazorpayCoachingOrder(
  programmeId: CoachingProgrammeId
) {
  const programme = coachingProgrammes[programmeId];

  if (programme.amount < 100) {
    throw new RazorpayOrderError("Programme amount must be at least ₹1.", 400);
  }

  const { publicKeyId } = getRazorpayCredentials();
  const razorpay = getRazorpayClient();

  let order: RazorpayOrder;

  try {
    order = (await razorpay.orders.create({
      amount: programme.amount,
      currency: "INR",
      receipt: `ima_coaching_${programmeId}_${Date.now()}`,
      notes: {
        purchase_type: "coaching",
        programme_id: programmeId,
        programme_name: programme.name,
      },
    })) as RazorpayOrder;
  } catch (error) {
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    throw new RazorpayOrderError(
      statusCode === 401
        ? "Razorpay authentication failed."
        : "Unable to create Razorpay order.",
      statusCode === 401 ? 401 : 500
    );
  }

  return {
    keyId: publicKeyId,
    orderId: order.id,
    order_id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    itemName: programme.name,
  };
}

export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error("Razorpay credentials are not configured.");
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedSignatureBuffer = Buffer.from(expectedSignature, "hex");

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer);
}

export function verifyRazorpayWebhookSignature({
  rawBody,
  signature,
}: {
  rawBody: string;
  signature: string;
}) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Razorpay webhook secret is not configured.");
  }

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedSignatureBuffer = Buffer.from(expectedSignature, "hex");

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer);
}

export async function fetchRazorpayPayment(paymentId: string) {
  return (await getRazorpayClient().payments.fetch(
    paymentId
  )) as RazorpayPayment;
}

export async function fetchRazorpayOrder(orderId: string) {
  return (await getRazorpayClient().orders.fetch(orderId)) as RazorpayOrder;
}
