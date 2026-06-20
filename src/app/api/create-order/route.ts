import { NextResponse } from "next/server";
import { isCoachingProgrammeId } from "@/lib/coaching/programmes";
import { isMembershipTierId } from "@/lib/membership/tiers";
import {
  createRazorpayCoachingOrder,
  createRazorpayMembershipOrder,
  RazorpayOrderError,
} from "@/lib/payments/razorpay";
import { getSupabaseServer } from "@/lib/supabase/server";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidIndianMobileNumber(value: unknown): value is string {
  return typeof value === "string" && /^[6-9]\d{9}$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      purchaseType?: unknown;
      tierId?: unknown;
      programmeId?: unknown;
      email?: unknown;
      phone?: unknown;
    };

    const purchaseType = body.purchaseType === "coaching" ? "coaching" : "membership";

    if (purchaseType === "membership" && !isMembershipTierId(body.tierId)) {
      return NextResponse.json(
        { error: "Please select a valid membership tier." },
        { status: 400 }
      );
    }

    if (
      purchaseType === "coaching" &&
      !isCoachingProgrammeId(body.programmeId)
    ) {
      return NextResponse.json(
        { error: "Please select a valid coaching programme." },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidIndianMobileNumber(body.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (purchaseType === "membership") {
      const normalizedEmail = body.email.trim().toLowerCase();
      const supabase = getSupabaseServer();
      const { data: existingMembers, error: lookupError } = await supabase
        .from("members")
        .select("id")
        .eq("email", normalizedEmail)
        .eq("payment_status", "paid")
        .limit(1);

      if (lookupError) {
        console.error(lookupError);

        return NextResponse.json(
          { error: "Unable to verify membership status. Please try again." },
          { status: 500 }
        );
      }

      if (existingMembers.length > 0) {
        return NextResponse.json(
          { error: "Membership already active" },
          { status: 409 }
        );
      }
    }

    if (purchaseType === "coaching") {
      if (!isCoachingProgrammeId(body.programmeId)) {
        return NextResponse.json(
          { error: "Please select a valid coaching programme." },
          { status: 400 }
        );
      }

      const order = await createRazorpayCoachingOrder(body.programmeId);
      return NextResponse.json(order);
    }

    if (!isMembershipTierId(body.tierId)) {
      return NextResponse.json(
        { error: "Please select a valid membership tier." },
        { status: 400 }
      );
    }

    const order = await createRazorpayMembershipOrder(body.tierId);
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    if (error instanceof RazorpayOrderError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "Unable to start payment. Please try again." },
      { status: 500 }
    );
  }
}
