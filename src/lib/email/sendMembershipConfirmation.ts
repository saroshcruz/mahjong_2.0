import "server-only";
import { Resend } from "resend";

type SendMembershipConfirmationInput = {
  to: string;
  name: string;
  membershipTier: string;
  membershipId: string;
  paymentId: string;
  amountPaid: number;
};

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

function formatCurrencyFromPaise(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  }).format(amount / 100);
}

export async function sendMembershipConfirmation({
  to,
  name,
  membershipTier,
  membershipId,
  paymentId,
  amountPaid,
}: SendMembershipConfirmationInput) {
  const from = process.env.FROM_EMAIL;

  if (!from) {
    throw new Error("From email is not configured.");
  }

  const safeName = escapeHtml(name);
  const safeMembershipTier = escapeHtml(membershipTier);
  const safeMembershipId = escapeHtml(membershipId);
  const safePaymentId = escapeHtml(paymentId);
  const safeAmountPaid = escapeHtml(formatCurrencyFromPaise(amountPaid));
  const dateJoined = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const result = await getResendClient().emails.send({
    from: `Indian Mahjong Association <${from}>`,
    to,
    subject: "Welcome to the Indian Mahjong Association",
    html: `
      <div style="margin:0;padding:0;background:#f7f0e4;color:#3b3028;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:680px;margin:0 auto;padding:42px 32px 46px;background:#fffaf1;color:#51463c;">
          <h1 style="margin:0 0 26px;color:#8d2430;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:400;letter-spacing:0.16em;text-align:center;text-transform:uppercase;">Indian Mahjong Association</h1>

          <p style="margin:0 0 30px;color:#2f2924;font-size:30px;line-height:1.25;text-align:center;">Welcome to the Table.</p>

          <div style="margin:0 0 36px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.75;">Thank you for becoming a member of the Indian Mahjong Association.</p>
            <p style="margin:0;font-size:16px;line-height:1.75;">Your membership has been successfully activated and we are delighted to welcome you to our growing community of players, learners and enthusiasts.</p>
          </div>

          <div style="margin:0 0 36px;padding:30px 0;border-top:1px solid #decaa8;border-bottom:1px solid #decaa8;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Membership ID</td>
                <td style="padding:0 0 18px;color:#2f2924;font-size:22px;line-height:1.35;text-align:right;">${safeMembershipId}</td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Member Name</td>
                <td style="padding:0 0 18px;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Membership Tier</td>
                <td style="padding:0 0 18px;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">${safeMembershipTier}</td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Payment ID</td>
                <td style="padding:0 0 18px;color:#352c26;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;text-align:right;">${safePaymentId}</td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Amount Paid</td>
                <td style="padding:0 0 18px;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">${safeAmountPaid}</td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Date Joined</td>
                <td style="padding:0 0 18px;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">${dateJoined}</td>
              </tr>
              <tr>
                <td style="padding:0;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Status</td>
                <td style="padding:0;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">Active</td>
              </tr>
            </table>
          </div>

          <div style="margin:0 0 34px;">
            <p style="margin:0 0 16px;font-size:15px;line-height:1.75;">Your membership certificate will be issued separately by the Indian Mahjong Association.</p>
            <p style="margin:0;font-size:15px;line-height:1.75;">Please retain this email as proof of membership activation and payment confirmation.</p>
          </div>

          <p style="margin:0;font-size:15px;line-height:1.75;">Warm regards,<br /><br />Indian Mahjong Association</p>
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

Amount Paid:
${formatCurrencyFromPaise(amountPaid)}

Status:
Active

Date Joined:
${dateJoined}

Your membership certificate will be issued separately by the Indian Mahjong Association.

Please retain this email as proof of membership activation and payment confirmation.

Warm regards,
Indian Mahjong Association`,
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
