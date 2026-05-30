import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | Indian Mahjong Association",
  description:
    "Privacy Policy for Indian Mahjong Association memberships, training, workshops, events and payment collection.",
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We collect information that helps us run memberships, training sessions, workshops, community gatherings and tournaments with care. This may include your name, phone number, email address, city, age group where relevant, membership tier, event preferences and any message you choose to send us.",
      "We collect this information when you register as a member, enquire about training, sign up for an event, make a payment, contact us, or interact with our website.",
    ],
  },
  {
    title: "Membership Information",
    body: [
      "For Pearl, Jade and Ruby memberships, we may maintain a member record that includes your selected membership tier, joining date, membership validity, renewal status, training participation and community or tournament eligibility.",
      "This allows us to confirm your membership, issue membership-related communications, manage access to programmes and maintain the integrity of IMA member records.",
    ],
  },
  {
    title: "Payment Information",
    body: [
      "Payments for memberships, workshops and events may be processed through Razorpay or another approved payment service provider. We do not store your complete card, UPI, net banking or wallet credentials on our website.",
      "We may receive and store payment references such as order ID, payment ID, transaction status, amount, date, selected membership or event, invoice details and refund status where applicable. These records help us reconcile payments, respond to support requests and meet accounting or compliance requirements.",
    ],
  },
  {
    title: "Event Registration Data",
    body: [
      "When you register for an IMA event, workshop, tournament or training table, we may collect attendance details, eligibility information, selected session, guest details where permitted and any access or participation notes required to organise the programme.",
      "For tournaments, we may also maintain participation history, category, score-related records or results where these are necessary for event administration.",
    ],
  },
  {
    title: "How Information Is Used",
    body: [
      "We use personal information to provide and improve IMA services, confirm memberships, process payments, manage event participation, communicate important updates, respond to enquiries, issue confirmations and maintain a safe community environment.",
      "We may also use aggregated, non-identifying information to understand interest in our programmes, improve scheduling and plan future Mahjong learning experiences.",
    ],
    points: [
      "To register, activate and manage memberships.",
      "To confirm payments, invoices, refunds and membership status.",
      "To send service messages about events, workshops, tournaments and training.",
      "To prevent misuse, duplicate registrations, payment errors or unauthorised access.",
      "To comply with applicable Indian legal, tax, accounting and payment gateway obligations.",
    ],
  },
  {
    title: "Cookies & Analytics",
    body: [
      "Our website may use basic cookies or analytics tools to understand site performance, page visits, device type and browsing behaviour. This helps us improve readability, mobile experience and website reliability.",
      "Where analytics tools are used, they are intended for operational insight and website improvement, not for selling personal information.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We take reasonable technical and organisational measures to protect personal information from unauthorised access, loss, misuse or alteration. Access to membership and payment-related records is limited to people who need it for IMA operations.",
      "No online system can be guaranteed to be completely secure. If we become aware of a data security issue that materially affects your information, we will take appropriate steps in accordance with applicable law.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "We may work with trusted third-party services for payment processing, website hosting, analytics, email delivery, event administration and operational support. These providers may process information only to the extent needed to provide their services to IMA.",
      "Payment processing is handled by payment gateway partners such as Razorpay. Their processing of payment information is governed by their own terms, security practices and regulatory obligations.",
    ],
  },
  {
    title: "Contact Information",
    body: [
      "For privacy questions, correction requests, membership record updates or payment-related privacy concerns, please contact the Indian Mahjong Association through the official contact details published on this website.",
      "When contacting us about a payment or membership record, please include your name, registered phone number or email address, membership tier if applicable and the relevant order or payment reference if available.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "We may update this Privacy Policy from time to time as our programmes, payment processes, legal obligations or website features evolve. The updated version will be posted on this page with a revised date.",
      "Your continued use of IMA services after an update means the updated policy applies to your future interactions with us.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Indian Mahjong Association"
      title="Privacy Policy"
      intro="A clear account of how we collect, use and protect information shared with us through memberships, training, events and payments."
      updated="30 May 2026"
      sections={sections}
      closingNote="IMA treats member trust as part of the culture we are preserving. We collect only what we reasonably need to serve the community, operate responsibly and support a smooth payment and membership experience."
    />
  );
}
