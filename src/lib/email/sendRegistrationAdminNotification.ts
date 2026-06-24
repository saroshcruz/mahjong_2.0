import "server-only";
import { Resend } from "resend";

type SendRegistrationAdminNotificationInput = {
  type: "membership" | "coaching";
  fullName: string;
  email: string;
  phone: string;
  city: string;
  experienceLevel?: string | null;
  label: string;
  recordId: string;
  paymentId: string;
  amountPaid: number;
  message?: string | null;
  submittedAt?: Date | string;
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

function getAdminRecipients() {
  const raw =
    process.env.ADMIN_NOTIFICATION_EMAIL ??
    process.env.ADMIN_EMAIL ??
    process.env.NOTIFICATION_EMAIL ??
    "";

  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
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

function formatDisplayTimestamp(value: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export async function sendRegistrationAdminNotification({
  type,
  fullName,
  email,
  phone,
  city,
  experienceLevel,
  label,
  recordId,
  paymentId,
  amountPaid,
  message,
  submittedAt = new Date(),
}: SendRegistrationAdminNotificationInput) {
  const recipients = getAdminRecipients();

  if (recipients.length === 0) {
    console.info("Admin notification skipped: no admin recipient configured.");
    return null;
  }

  const from = process.env.FROM_EMAIL;

  if (!from) {
    throw new Error("From email is not configured.");
  }

  const title =
    type === "membership"
      ? "New IMA Membership Registration"
      : "New IMA Coaching Registration";
  const messageText = message?.trim() || "No message provided.";
  const rows = [
    ["Type", type === "membership" ? "Membership" : "Coaching"],
    [type === "membership" ? "Membership ID" : "Registration ID", recordId],
    ["Full Name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["City", city],
    ...(type === "coaching"
      ? [["Experience Level", experienceLevel?.trim() || "Not provided"]]
      : []),
    [type === "membership" ? "Membership Tier" : "Programme", label],
    ["Payment ID", paymentId],
    ["Amount Paid", formatCurrencyFromPaise(amountPaid)],
    ["Message / Notes", messageText],
    ["Timestamp", formatDisplayTimestamp(submittedAt)],
  ];
  const safeRows = rows.map(([key, value]) => [
    escapeHtml(key),
    escapeHtml(value),
  ]);

  const result = await getResendClient().emails.send({
    from: `Indian Mahjong Association <${from}>`,
    to: recipients,
    subject: title,
    html: `
      <div style="margin:0;padding:0;background:#f7f0e4;color:#3b3028;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:680px;margin:0 auto;padding:36px 30px;background:#fffaf1;color:#51463c;">
          <h1 style="margin:0 0 24px;color:#8d2430;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;font-weight:400;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(title)}</h1>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #decaa8;">
            ${safeRows
              .map(
                ([key, value]) => `
                  <tr>
                    <td style="width:38%;padding:15px 14px 15px 0;border-bottom:1px solid #decaa8;color:#8d2430;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.45;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;vertical-align:top;">${key}</td>
                    <td style="padding:15px 0;border-bottom:1px solid #decaa8;color:#352c26;font-size:15px;line-height:1.6;vertical-align:top;">${value}</td>
                  </tr>
                `
              )
              .join("")}
          </table>
        </div>
      </div>
    `,
    text: `${title}

Type:
${type === "membership" ? "Membership" : "Coaching"}

${type === "membership" ? "Membership ID" : "Registration ID"}:
${recordId}

Full Name:
${fullName}

Email:
${email}

Phone:
${phone}

City:
${city}

${type === "coaching" ? `Experience Level:\n${experienceLevel?.trim() || "Not provided"}\n\n` : ""}${type === "membership" ? "Membership Tier" : "Programme"}:
${label}

Payment ID:
${paymentId}

Amount Paid:
${formatCurrencyFromPaise(amountPaid)}

Message / Notes:
${messageText}

Timestamp:
${formatDisplayTimestamp(submittedAt)}`,
  });

  if (result.error) {
    throw new Error(
      typeof result.error === "object" && "message" in result.error
        ? String(result.error.message)
        : "Resend admin notification failed."
    );
  }

  return result.data;
}
