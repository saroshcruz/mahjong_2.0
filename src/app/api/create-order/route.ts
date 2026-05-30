import { NextResponse } from "next/server";
import { isMembershipTierId } from "@/lib/membership/tiers";
import { createRazorpayMembershipOrder } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { tierId?: unknown };

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

    return NextResponse.json(
      { error: "Unable to start payment. Please try again." },
      { status: 500 }
    );
  }
}
