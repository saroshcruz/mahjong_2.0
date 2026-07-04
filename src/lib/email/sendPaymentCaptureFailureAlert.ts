import "server-only";

import { Resend } from "resend";

type PaymentCaptureFailureAlertInput = {
  source: "browser" | "webhook";
  stage: string;
  paymentId?: string;
  orderId?: string;
  tierId?: string;
  amount?: number;
  webhookEventId?: string | null;
  error: unknown;
};

const alertRecipient = "caselleandco@gmail.com";
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

function describeError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendPaymentCaptureFailureAlert({
  source,
  stage,
  paymentId,
  orderId,
  tierId,
  amount,
  webhookEventId,
  error,
}: PaymentCaptureFailureAlertInput) {
  const from = process.env.FROM_EMAIL;

  if (!from) {
    throw new Error("From email is not configured.");
  }

  const errorMessage = describeError(error);
  const timestamp = new Date().toISOString();
  const details = [
    ["Source", source],
    ["Failure Stage", stage],
    ["Payment ID", paymentId ?? "Unavailable"],
    ["Order ID", orderId ?? "Unavailable"],
    ["Membership Tier ID", tierId ?? "Unavailable"],
    ["Amount (paise)", amount == null ? "Unavailable" : String(amount)],
    ["Webhook Event ID", webhookEventId ?? "Unavailable"],
    ["Timestamp", timestamp],
    ["Error", errorMessage],
  ];
  const text = `A captured Razorpay membership payment requires attention.\n\n${details
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n")}`;
  const result = await getResendClient().emails.send(
    {
      from: `Indian Mahjong Association <${from}>`,
      to: alertRecipient,
      subject: "IMA captured payment requires attention",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#2d2926;line-height:1.6;">
          <h1 style="font-size:20px;color:#7c1f2d;">Captured payment requires attention</h1>
          <p>A captured Razorpay membership payment could not be converted into a member record.</p>
          <table style="border-collapse:collapse;width:100%;max-width:680px;">
            ${details
              .map(
                ([label, value]) => `
                  <tr>
                    <th style="border-bottom:1px solid #decaa8;padding:10px;text-align:left;vertical-align:top;">${escapeHtml(label)}</th>
                    <td style="border-bottom:1px solid #decaa8;padding:10px;">${escapeHtml(value)}</td>
                  </tr>
                `
              )
              .join("")}
          </table>
        </div>
      `,
      text,
    },
    {
      idempotencyKey: `ima-payment-failure-${paymentId ?? webhookEventId ?? timestamp}-${stage}`.slice(
        0,
        256
      ),
    }
  );

  if (result.error) {
    throw result.error;
  }

  return result.data;
}
