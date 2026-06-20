import "server-only";
import { Resend } from "resend";

type SendCoachingConfirmationInput = {
  to: string;
  name: string;
  registrationId: string;
  programmeName: string;
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

export async function sendCoachingConfirmation({
  to,
  name,
  registrationId,
  programmeName,
  paymentId,
  amountPaid,
}: SendCoachingConfirmationInput) {
  const from = process.env.FROM_EMAIL;

  if (!from) {
    throw new Error("From email is not configured.");
  }

  const safeName = escapeHtml(name);
  const safeRegistrationId = escapeHtml(registrationId);
  const safeProgrammeName = escapeHtml(programmeName);
  const safePaymentId = escapeHtml(paymentId);
  const safeAmountPaid = escapeHtml(formatCurrencyFromPaise(amountPaid));

  const result = await getResendClient().emails.send({
    from: `Indian Mahjong Association <${from}>`,
    to,
    subject: "Advanced Coaching Programme Registration Confirmed",
    html: `
      <div style="margin:0;padding:0;background:#f7f0e4;color:#3b3028;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:680px;margin:0 auto;padding:42px 32px 46px;background:#fffaf1;color:#51463c;">
          <h1 style="margin:0 0 26px;color:#8d2430;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:400;letter-spacing:0.16em;text-align:center;text-transform:uppercase;">Indian Mahjong Association</h1>

          <p style="margin:0 0 30px;color:#2f2924;font-size:30px;line-height:1.25;text-align:center;">Welcome to the Advanced Coaching Programme.</p>

          <div style="margin:0 0 36px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.75;">Thank you for registering for the Indian Mahjong Association Advanced Coaching Programme.</p>
            <p style="margin:0;font-size:16px;line-height:1.75;">Your registration has been successfully confirmed and payment has been received.</p>
          </div>

          <div style="margin:0 0 36px;padding:30px 0;border-top:1px solid #decaa8;border-bottom:1px solid #decaa8;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Registration ID</td>
                <td style="padding:0 0 18px;color:#2f2924;font-size:22px;line-height:1.35;text-align:right;">${safeRegistrationId}</td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Participant Name</td>
                <td style="padding:0 0 18px;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:0 0 18px;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Programme</td>
                <td style="padding:0 0 18px;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">${safeProgrammeName}</td>
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
                <td style="padding:0;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Status</td>
                <td style="padding:0;color:#352c26;font-size:17px;line-height:1.45;text-align:right;">Confirmed</td>
              </tr>
            </table>
          </div>

          <div style="margin:0 0 34px;">
            <p style="margin:0 0 12px;font-size:15px;line-height:1.75;">15 Hours of Instruction</p>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.75;">Delivered across 5 guided sessions.</p>
            <p style="margin:0;font-size:15px;line-height:1.75;">Our team will contact you with scheduling and programme information.</p>
          </div>

          <div style="margin:0 0 34px;">
            <p style="margin:0;font-size:15px;line-height:1.75;">Please retain this email as proof of registration and payment.</p>
          </div>

          <p style="margin:0;font-size:15px;line-height:1.75;">Warm regards,<br /><br />Indian Mahjong Association</p>
        </div>
      </div>
    `,
    text: `Indian Mahjong Association

Welcome to the Advanced Coaching Programme.

Thank you for registering for the Indian Mahjong Association Advanced Coaching Programme.

Your registration has been successfully confirmed and payment has been received.

Registration ID:
${registrationId}

Participant Name:
${name}

Programme:
${programmeName}

Payment ID:
${paymentId}

Amount Paid:
${formatCurrencyFromPaise(amountPaid)}

Status:
Confirmed

Programme Details:
15 Hours of Instruction
Delivered across 5 guided sessions.

Our team will contact you with scheduling and programme information.

Please retain this email as proof of registration and payment.

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
