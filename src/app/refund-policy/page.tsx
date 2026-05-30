import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Refund Policy | Indian Mahjong Association",
  description:
    "Refund Policy for Indian Mahjong Association memberships, events, workshops, training and payment support.",
};

const sections = [
  {
    title: "Membership Refunds",
    body: [
      "IMA memberships are designed as access-based community memberships. Once a Pearl, Jade or Ruby membership is activated, membership fees are generally non-refundable because member records, programme access, community privileges and administrative processing begin immediately.",
      "If you believe a membership was purchased in error, please contact us as soon as possible. Requests made before activation or before any membership benefit has been used may be reviewed on a case-by-case basis.",
    ],
  },
  {
    title: "Event Cancellation Policy",
    body: [
      "Refunds for paid events, workshops, tournaments or training sessions may depend on the event format, organiser commitments, venue arrangements and timing of the cancellation request.",
      "If an event allows participant cancellation, the applicable cancellation window and refund eligibility will be communicated with the event details wherever possible. Late cancellations, no-shows or partially attended sessions may not be eligible for refund.",
    ],
  },
  {
    title: "Duplicate or Failed Payments",
    body: [
      "If you are charged twice for the same membership, event or workshop, or if money is debited but the transaction does not complete, please contact us with the payment reference, date, amount and registered contact details.",
      "Verified duplicate payments will be refunded to the original payment method. Failed or pending payments are usually reversed by the bank or payment provider according to their own settlement timelines.",
    ],
  },
  {
    title: "Refund Timelines",
    body: [
      "Once a refund is approved and initiated, it will ordinarily be processed through the original payment method. The time taken for the amount to reflect in your account may depend on Razorpay, your bank, card network, UPI provider or wallet provider.",
      "As a general guide, approved refunds may take 5 to 10 working days after initiation, though some banks or payment methods may take longer.",
    ],
  },
  {
    title: "Cancelled or Rescheduled Events",
    body: [
      "If IMA cancels a paid event, workshop or training session, we may offer a rescheduled date, credit toward a future programme, or refund eligibility depending on the nature of the event and the circumstances of cancellation.",
      "If a participant cannot attend a rescheduled date, the request will be reviewed fairly based on the event terms, costs already committed and available alternatives.",
    ],
  },
  {
    title: "Exceptional Circumstances",
    body: [
      "We understand that genuine exceptional circumstances can arise. Medical emergencies, serious personal situations, accidental duplicate registrations or administrative errors may be reviewed with care and discretion.",
      "Any exception remains subject to verification, programme status, payment gateway records and whether membership or event benefits have already been substantially used.",
    ],
  },
  {
    title: "Disputes and Contact-First Resolution",
    body: [
      "If you have a concern about a payment, membership activation, event access or refund request, please contact IMA first so we can review the matter directly. This is usually the fastest and most constructive way to resolve payment issues.",
      "Please include your name, registered email or phone number, membership tier or event name, payment amount, transaction date and Razorpay payment ID or order ID if available.",
    ],
  },
  {
    title: "Contact for Refund Requests",
    body: [
      "Refund and cancellation requests should be sent through the official contact details published on this website. Requests are reviewed during working days and may require additional information before a decision can be made.",
      "Submitting a request does not automatically guarantee refund approval, but every request will be considered in good faith under this policy.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Payments & Memberships"
      title="Refund Policy"
      intro="A practical and fair policy for membership payments, events, workshops, training sessions and payment support."
      updated="30 May 2026"
      sections={sections}
      closingNote="This policy is intended to be clear, reasonable and payment-gateway ready while respecting the nature of a membership-based cultural association."
    />
  );
}
