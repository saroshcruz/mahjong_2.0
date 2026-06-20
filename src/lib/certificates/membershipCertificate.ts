import "server-only";

import { readFile } from "fs/promises";
import path from "path";
import { PDFDocument, type PDFPage, rgb, StandardFonts, type PDFFont } from "pdf-lib";

type MembershipCertificateInput = {
  memberName: string;
  membershipTier: string;
  membershipId: string;
  issueDate: string;
};

const certificateWidth = 842;
const certificateHeight = 595;
const burgundy = rgb(0.49, 0.12, 0.18);
const charcoal = rgb(0.17, 0.15, 0.13);
const warmBrown = rgb(0.39, 0.3, 0.24);
const cream = rgb(0.99, 0.95, 0.87);

function centeredText({
  page,
  text,
  y,
  font,
  size,
  color,
  letterSpacing = 0,
  shadow = true,
}: {
  page: PDFPage;
  text: string;
  y: number;
  font: PDFFont;
  size: number;
  color: ReturnType<typeof rgb>;
  letterSpacing?: number;
  shadow?: boolean;
}) {
  const width =
    font.widthOfTextAtSize(text, size) +
    Math.max(0, text.length - 1) * letterSpacing;
  const startX = (certificateWidth - width) / 2;

  if (letterSpacing <= 0) {
    if (shadow) {
      page.drawText(text, {
        x: startX + 1.2,
        y: y - 1.2,
        size,
        font,
        color: cream,
        opacity: 0.52,
      });
    }
    page.drawText(text, {
      x: startX,
      y,
      size,
      font,
      color,
    });
    return;
  }

  let x = startX;
  for (const character of text) {
    if (shadow) {
      page.drawText(character, {
        x: x + 1.2,
        y: y - 1.2,
        size,
        font,
        color: cream,
        opacity: 0.52,
      });
    }
    page.drawText(character, {
      x,
      y,
      size,
      font,
      color,
    });
    x += font.widthOfTextAtSize(character, size) + letterSpacing;
  }
}

function formatTier(tier: string) {
  return tier.replace(/\s+Membership$/i, " Membership");
}

export function getMembershipCertificateFilename(membershipId: string) {
  return `IMA-Membership-Certificate-${membershipId}.pdf`;
}

export async function generateMembershipCertificatePdf({
  memberName,
  membershipTier,
  membershipId,
  issueDate,
}: MembershipCertificateInput) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([certificateWidth, certificateHeight]);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const heroPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "hero",
    "hero-banner-3.png"
  );
  const heroBytes = await readFile(heroPath);
  const hero = await pdfDoc.embedPng(heroBytes);
  const heroScale = Math.max(
    certificateWidth / hero.width,
    certificateHeight / hero.height
  );
  const heroWidth = hero.width * heroScale;
  const heroHeight = hero.height * heroScale;

  page.drawImage(hero, {
    x: (certificateWidth - heroWidth) / 2,
    y: (certificateHeight - heroHeight) / 2,
    width: heroWidth,
    height: heroHeight,
  });

  const logoPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "logos",
    "logo.jpeg"
  );
  const logoBytes = await readFile(logoPath);
  const logo = await pdfDoc.embedJpg(logoBytes);
  const logoSize = 79;
  page.drawImage(logo, {
    x: (certificateWidth - logoSize) / 2,
    y: 490,
    width: logoSize,
    height: logoSize,
  });

  centeredText({
    page,
    text: "MEMBERSHIP CERTIFICATE",
    y: 422,
    font: timesBold,
    size: 36,
    color: burgundy,
    letterSpacing: 1.2,
  });

  centeredText({
    page,
    text: "This certifies that",
    y: 367,
    font: timesRoman,
    size: 18,
    color: warmBrown,
  });

  centeredText({
    page,
    text: memberName.toUpperCase(),
    y: 305,
    font: timesBold,
    size: 48,
    color: charcoal,
    letterSpacing: 1.1,
  });

  centeredText({
    page,
    text: "is a verified member of the",
    y: 256,
    font: timesRoman,
    size: 17,
    color: warmBrown,
  });

  centeredText({
    page,
    text: "Indian Mahjong Association",
    y: 219,
    font: timesBold,
    size: 26,
    color: charcoal,
  });

  centeredText({
    page,
    text: formatTier(membershipTier),
    y: 174,
    font: timesRoman,
    size: 22,
    color: burgundy,
  });

  centeredText({
    page,
    text: `Membership ID: ${membershipId}`,
    y: 117,
    font: helvetica,
    size: 12,
    color: warmBrown,
  });

  centeredText({
    page,
    text: `Issued: ${issueDate}`,
    y: 92,
    font: helvetica,
    size: 12,
    color: warmBrown,
  });

  centeredText({
    page,
    text: "Preserving Tradition. Building Community.",
    y: 50,
    font: timesRoman,
    size: 14,
    color: burgundy,
  });

  return pdfDoc.save();
}
