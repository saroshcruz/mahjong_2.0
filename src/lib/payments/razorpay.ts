import { membershipTiers, type MembershipTierId } from "@/lib/membership/tiers";

type RazorpayOrder = {
  id: string;
  amount: number;
  currency: "INR";
};

const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";

function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? keyId;

  if (!keyId || !keySecret || !publicKeyId) {
    throw new Error("Razorpay test keys are not configured.");
  }

  return { keyId, keySecret, publicKeyId };
}

export async function createRazorpayMembershipOrder(tierId: MembershipTierId) {
  const tier = membershipTiers[tierId];
  const { keyId, keySecret, publicKeyId } = getRazorpayCredentials();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const response = await fetch(RAZORPAY_ORDERS_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: tier.amount,
      currency: "INR",
      receipt: `ima_${tierId}_${Date.now()}`,
      notes: {
        membership_tier: tier.name,
        mode: "test",
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to create Razorpay order.");
  }

  const order = (await response.json()) as RazorpayOrder;

  return {
    keyId: publicKeyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    tierName: tier.name,
  };
}
