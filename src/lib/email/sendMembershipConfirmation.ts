import "server-only";
import { readFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";

type SendMembershipConfirmationInput = {
  to: string;
  name: string;
  membershipTier: string;
  membershipId: string;
  paymentId: string;
};

const certificateArtworkPath = path.join(
  process.cwd(),
  "public",
  "assets",
  "email",
  "email-bg.png"
);

let resendClient: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Resend API key is not configured.");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendMembershipConfirmation({
  to,
  name,
  membershipTier,
  membershipId,
  paymentId,
}: SendMembershipConfirmationInput) {
  const from = process.env.FROM_EMAIL;

  if (!from) {
    throw new Error("From email is not configured.");
  }

  const safeName = escapeHtml(name);
  const safeMembershipTier = escapeHtml(membershipTier);
  const safeMembershipId = escapeHtml(membershipId);
  const safePaymentId = escapeHtml(paymentId);
  const dateJoined = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  const certificateArtwork = await readFile(certificateArtworkPath);

  const result = await getResendClient().emails.send({
    from: `Indian Mahjong Association <${from}>`,
    to,
    subject: "Welcome to the Indian Mahjong Association",
    html: `
      <div style="margin:0;padding:0;background:#f7f0e4;color:#3b3028;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:600px;margin:0 auto;padding:34px 28px 40px;background:#fffaf1;color:#51463c;">
          <p style="margin:0 0 20px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.24em;text-align:center;text-transform:uppercase;">Indian Mahjong Association</p>
          <h1 style="margin:0 0 24px;color:#2f2924;font-size:30px;line-height:1.22;font-weight:400;text-align:center;">Welcome to the Table.</h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.72;">Thank you for becoming a member of the Indian Mahjong Association.</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.72;">Your membership has been successfully activated and we are delighted to welcome you to our growing community of players, learners and enthusiasts.</p>
          <div style="margin:28px 0;padding:22px 0;border-top:1px solid #decaa8;border-bottom:1px solid #decaa8;text-align:center;">
            <p style="margin:0 0 8px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Membership ID</p>
            <p style="margin:0 0 20px;color:#2f2924;font-size:28px;line-height:1.25;letter-spacing:0.03em;">${safeMembershipId}</p>
            <p style="margin:0 0 6px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Member Name</p>
            <p style="margin:0 0 16px;color:#352c26;font-size:18px;line-height:1.45;">${safeName}</p>
            <p style="margin:0 0 6px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Membership Tier</p>
            <p style="margin:0 0 16px;color:#352c26;font-size:18px;line-height:1.45;">${safeMembershipTier}</p>
            <p style="margin:0 0 6px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Payment ID</p>
            <p style="margin:0 0 16px;color:#352c26;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;">${safePaymentId}</p>
            <p style="margin:0 0 6px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Date Joined</p>
            <p style="margin:0 0 16px;color:#352c26;font-size:17px;line-height:1.45;">${dateJoined}</p>
            <p style="margin:0 0 6px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Status</p>
            <p style="margin:0;color:#352c26;font-size:17px;line-height:1.45;">Active</p>
          </div>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.72;">Your membership certificate is attached to this email. Please download and retain it as proof of payment and verification of your ${safeMembershipTier}.</p>
          <p style="margin:0;font-size:15px;line-height:1.72;">Warm regards,<br />Indian Mahjong Association</p>
        </div>
      </div>
    `,
    text: `Hello ${name},

Welcome to the Indian Mahjong Association.

Your membership has been successfully activated.

Member Name:
${name}

Membership Tier:
${membershipTier}

Membership ID:
${membershipId}

Payment ID:
${paymentId}

Status:
Active

Date Joined:
${dateJoined}

Next Steps:
- Receive member communications and announcements
- Access IMA events and gatherings according to your membership tier
- Participate in future training sessions and community activities

We look forward to welcoming you to upcoming training sessions, events and community gatherings.

Please retain this email as proof of payment and verification of your ${membershipTier}.

Warm regards,
Indian Mahjong Association

Preserving tradition. Building community.`,
    attachments: [
      {
        filename: "ima-membership-certificate.png",
        content: certificateArtwork,
        contentType: "image/png",
      },
    ],
  });

  if (result.error) {
    throw new Error(
      typeof result.error === "object" && "message" in result.error
        ? String(result.error.message)
        : "Resend email delivery failed."
    );
  }

  return result.data;
}
