"use client";

import { useState } from "react";
import type { CoachingProgrammeId } from "@/lib/coaching/programmes";
import type { MembershipTierId } from "@/lib/membership/tiers";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: "payment.failed",
        handler: (response: RazorpayFailureResponse) => void
      ) => void;
    };
  }
}

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: "INR";
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
};

type OrderResponse = {
  keyId: string;
  orderId: string;
  order_id: string;
  amount: number;
  currency: "INR";
  tierName?: string;
  itemName?: string;
  error?: string;
};

type VerifyPaymentResponse = {
  verified?: boolean;
  paymentId?: string;
  orderId?: string;
  membershipId?: string;
  registrationId?: string;
  itemName?: string;
  error?: string;
};

type RazorpayCheckoutProps = {
  purchaseType?: "membership" | "coaching";
  tierId?: MembershipTierId;
  programmeId?: CoachingProgrammeId;
  cta: string;
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
    city?: string;
    experienceLevel?: string;
    message?: string;
  };
  onSuccess?: (payment: {
    paymentId: string;
    orderId: string;
    membershipId?: string;
    registrationId?: string;
    itemName?: string;
  }) => void;
};

let checkoutScriptPromise: Promise<void> | null = null;

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (checkoutScriptPromise) return checkoutScriptPromise;

  checkoutScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Razorpay Checkout."));
    document.body.appendChild(script);
  });

  return checkoutScriptPromise;
}

export default function RazorpayCheckout({
  purchaseType = "membership",
  tierId,
  programmeId,
  cta,
  customer,
  onSuccess,
}: RazorpayCheckoutProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "verifying" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const startCheckout = async () => {
    setStatus("loading");
    setMessage(null);

    try {
      const [orderResponse] = await Promise.all([
        fetch("/api/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            purchaseType,
            tierId,
            programmeId,
            email: customer?.email,
            phone: customer?.phone,
          }),
        }),
        loadRazorpayCheckout(),
      ]);

      const order = (await orderResponse.json()) as OrderResponse;

      if (!orderResponse.ok || order.error) {
        throw new Error(
          order.error === "Membership already active"
            ? "You already have an active IMA membership."
            : order.error ?? "Unable to start payment."
        );
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout is not available.");
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Indian Mahjong Association",
        description:
          purchaseType === "coaching"
            ? "Advanced Coaching Programme"
            : "Membership Registration",
        order_id: order.orderId,
        prefill: {
          name: customer?.fullName,
          email: customer?.email,
          contact: customer?.phone,
        },
        theme: {
          color: "#7c1f2d",
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            setMessage("Payment was cancelled before completion.");
          },
        },
        handler: async (response) => {
          setStatus("verifying");
          setMessage("Verifying payment...");

          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                purchaseType,
                tierId,
                programmeId,
                full_name: customer?.fullName,
                email: customer?.email,
                phone: customer?.phone,
                city: customer?.city,
                experienceLevel: customer?.experienceLevel,
                message: customer?.message,
              }),
            });
            const verification = (await verifyResponse.json()) as VerifyPaymentResponse;

            if (!verifyResponse.ok || !verification.verified) {
              throw new Error(verification.error ?? "Payment verification failed.");
            }

            if (purchaseType === "membership" && !verification.membershipId) {
              throw new Error("Membership details could not be confirmed.");
            }

            setStatus("success");
            setMessage(
              `${order.tierName ?? order.itemName ?? "Registration"} payment has been verified.`
            );
            onSuccess?.({
              paymentId: verification.paymentId ?? response.razorpay_payment_id,
              orderId: verification.orderId ?? response.razorpay_order_id,
              membershipId: verification.membershipId,
              registrationId: verification.registrationId,
              itemName: verification.itemName ?? order.itemName ?? order.tierName,
            });
          } catch (error) {
            setStatus("idle");
            setMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Please contact support."
            );
          }
        },
      });

      checkout.on("payment.failed", (response) => {
        setStatus("idle");
        setMessage(
          response.error?.description ??
            "Payment could not be completed. Please try again."
        );
      });

      checkout.open();
    } catch (error) {
      setStatus("idle");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="w-full rounded-[0.75rem] border border-[#c6a87a]/36 bg-[#fbf7ef]/76 px-5 py-4 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)]">
        <p className="text-[0.71rem] uppercase tracking-[0.24em] text-[#7c1f2d]">
          Payment Successful
        </p>
        <p className="mt-2 text-[0.95rem] leading-[1.66] text-[#4d3a2e]">
          {message ?? "Your membership payment has been verified."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <button
        type="button"
        onClick={startCheckout}
        disabled={status === "loading" || status === "verifying"}
        className="flex min-h-12 w-auto items-center justify-center rounded-full border border-[#7c1f2d] bg-[linear-gradient(180deg,#8b2736,#6d1b28)] px-8 py-3 text-[0.77rem] uppercase tracking-[0.20em] text-[#f5efe4] shadow-[0_6px_18px_rgba(124,31,45,0.18)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(124,31,45,0.24)] disabled:cursor-wait disabled:opacity-70 lg:min-h-0 lg:text-[0.75rem] lg:tracking-[0.22em]"
      >
        {status === "loading"
          ? "Opening Checkout"
          : status === "verifying"
            ? "Verifying Payment"
            : cta}
      </button>

      {message && (
        <p className="mt-3 max-w-[26ch] text-center text-[0.84rem] leading-[1.56] text-[#7c1f2d]">
          {message}
        </p>
      )}
    </div>
  );
}
