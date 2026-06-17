import "server-only";
import { readFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";
import sharp from "sharp";

type SendMembershipConfirmationInput = {
  to: string;
  name: string;
  membershipTier: string;
  membershipId: string;
  paymentId: string;
};

const certificateImageContentId = "ima-membership-certificate";
const certificateArtworkPath = path.join(
  process.cwd(),
  "public",
  "assets",
  "email",
  "email-bg.webp"
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

function certificateText({
  safeName,
  safeMembershipTier,
  safeMembershipId,
  safePaymentId,
  dateJoined,
}: {
  safeName: string;
  safeMembershipTier: string;
  safeMembershipId: string;
  safePaymentId: string;
  dateJoined: string;
}) {
  return Buffer.from(`
    <svg width="1122" height="1402" viewBox="0 0 1122 1402" xmlns="http://www.w3.org/2000/svg">
      <style>
        .serif { font-family: Georgia, "Times New Roman", serif; }
        .sans { font-family: Arial, Helvetica, sans-serif; }
        .heading { fill: #7c1f2d; font-size: 52px; font-weight: 400; letter-spacing: 4px; }
        .eyebrow { fill: #8d2430; font-size: 19px; font-weight: 700; letter-spacing: 7px; }
        .welcome { fill: #2f2924; font-size: 48px; font-weight: 400; }
        .label { fill: #8d2430; font-size: 17px; font-weight: 700; letter-spacing: 5px; }
        .value { fill: #352c26; font-size: 36px; font-weight: 400; }
        .membership { fill: #2f2924; font-size: 54px; font-weight: 400; letter-spacing: 3px; }
        .payment { fill: #352c26; font-size: 24px; font-weight: 400; }
        .closing { fill: #51463c; font-size: 27px; font-weight: 400; }
        .tagline { fill: #8d2430; font-size: 24px; font-style: italic; }
      </style>

      <text x="561" y="248" text-anchor="middle" class="serif heading">INDIAN MAHJONG ASSOCIATION</text>
      <text x="561" y="306" text-anchor="middle" class="sans eyebrow">THANK YOU FOR JOINING</text>
      <text x="561" y="362" text-anchor="middle" class="serif welcome">Welcome to the Table.</text>

      <text x="561" y="454" text-anchor="middle" class="sans label">MEMBER NAME</text>
      <text x="561" y="504" text-anchor="middle" class="serif value">${safeName}</text>

      <text x="561" y="574" text-anchor="middle" class="sans label">MEMBERSHIP ID</text>
      <text x="561" y="638" text-anchor="middle" class="serif membership">${safeMembershipId}</text>

      <text x="561" y="722" text-anchor="middle" class="sans label">MEMBERSHIP TIER</text>
      <text x="561" y="768" text-anchor="middle" class="serif value">${safeMembershipTier}</text>

      <text x="561" y="834" text-anchor="middle" class="sans label">PAYMENT ID</text>
      <text x="561" y="874" text-anchor="middle" class="sans payment">${safePaymentId}</text>

      <text x="561" y="942" text-anchor="middle" class="sans label">DATE JOINED</text>
      <text x="561" y="986" text-anchor="middle" class="serif value">${dateJoined}</text>

      <text x="561" y="1054" text-anchor="middle" class="sans label">STATUS</text>
      <text x="561" y="1098" text-anchor="middle" class="serif value">Active</text>

      <text x="561" y="1196" text-anchor="middle" class="serif closing">Warm regards,</text>
      <text x="561" y="1236" text-anchor="middle" class="serif closing">Indian Mahjong Association</text>
      <text x="561" y="1284" text-anchor="middle" class="serif tagline">Preserving tradition. Building community.</text>
    </svg>
  `);
}

async function createCertificateImage(input: {
  safeName: string;
  safeMembershipTier: string;
  safeMembershipId: string;
  safePaymentId: string;
  dateJoined: string;
}) {
  const artwork = await readFile(certificateArtworkPath);

  return sharp(artwork)
    .resize(1122, 1402, { fit: "fill" })
    .composite([
      {
        input: certificateText(input),
        top: 0,
        left: 0,
      },
    ])
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
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
  const certificateImage = await createCertificateImage({
    safeName,
    safeMembershipTier,
    safeMembershipId,
    safePaymentId,
    dateJoined,
  });

  return getResendClient().emails.send({
    from: `Indian Mahjong Association <${from}>`,
    to,
    subject: "Welcome to the Indian Mahjong Association",
    html: `
      <div style="margin:0;padding:0;background:#f7f0e4;color:#3b3028;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:600px;margin:0 auto;padding:0;">
          <img src="cid:${certificateImageContentId}" width="600" alt="Indian Mahjong Association membership certificate" style="display:block;width:100%;max-width:600px;height:auto;border:0;margin:0 auto;" />
          <div style="padding:30px 28px 38px;background:#fffaf1;color:#51463c;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.72;">Thank you for becoming a member of the Indian Mahjong Association.</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.72;">Your membership has been successfully activated and we are delighted to welcome you to our growing community of players, learners and enthusiasts.</p>
            <p style="margin:0;font-size:15px;line-height:1.72;">Please download and retain the attached membership certificate as proof of payment and verification of your ${safeMembershipTier}.</p>
          </div>
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

Please download and retain the attached membership certificate as proof of payment and verification of your ${membershipTier}.

Warm regards,
Indian Mahjong Association

Preserving tradition. Building community.`,
    attachments: [
      {
        filename: "ima-membership-certificate.png",
        content: certificateImage,
        contentType: "image/png",
        contentId: certificateImageContentId,
      },
    ],
  });
}
