import "server-only";

import { timingSafeEqual } from "node:crypto";

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function isDashboardRequestAuthorized(request: Request) {
  const expectedSecret = process.env.IMA_DASHBOARD_API_SECRET;

  if (!expectedSecret) {
    console.error("IMA_DASHBOARD_API_SECRET is not configured.");
    return false;
  }

  const authorization = request.headers.get("authorization");
  const prefix = "Bearer ";

  if (!authorization?.startsWith(prefix)) {
    return false;
  }

  return safeCompare(authorization.slice(prefix.length), expectedSecret);
}
