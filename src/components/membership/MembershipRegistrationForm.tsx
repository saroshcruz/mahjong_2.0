"use client";

import { useState } from "react";
import type { MembershipTierId } from "@/lib/membership/tiers";
import RazorpayCheckout from "@/components/payments/RazorpayCheckout";

const experienceLevels = ["Beginner", "Intermediate", "Experienced"];

type RegistrationDetails = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  experienceLevel: string;
  message: string;
};

export default function MembershipRegistrationForm({
  tierId,
}: {
  tierId: MembershipTierId;
}) {
  const [registrationDetails, setRegistrationDetails] =
    useState<RegistrationDetails | null>(null);
  const [paymentReference, setPaymentReference] = useState<{
    paymentId: string;
    orderId: string;
  } | null>(null);

  if (registrationDetails) {
    return (
      <div className="rounded-[0.75rem] border border-[#c6a87a]/36 bg-[#fbf7ef]/76 px-6 py-7 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)] sm:px-8 sm:py-8">
        <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#7c1f2d]">
          Registration Received
        </p>
        <h2 className="mt-4 text-[1.8rem] leading-tight text-[#2d2926] sm:text-[2.15rem]">
          Complete your membership payment.
        </h2>
        <p className="mx-auto mt-4 max-w-[38ch] text-[1rem] leading-[1.86] text-[#5d4d40]">
          Your membership details are ready. Continue to Razorpay Standard Checkout to complete your registration.
        </p>

        <div className="mt-7 flex justify-center">
          <RazorpayCheckout
            tierId={tierId}
            cta="Pay Securely"
            customer={registrationDetails}
            onSuccess={setPaymentReference}
          />
        </div>

        {paymentReference && (
          <p className="mx-auto mt-4 max-w-[42ch] text-[0.78rem] leading-[1.62] text-[#5d4d40]">
            Payment ID: {paymentReference.paymentId}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setRegistrationDetails({
          fullName: String(formData.get("fullName") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          city: String(formData.get("city") ?? ""),
          experienceLevel: String(formData.get("experienceLevel") ?? ""),
          message: String(formData.get("message") ?? ""),
        });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
            Full Name
          </span>
          <input
            required
            name="fullName"
            autoComplete="name"
            className="mt-2.5 min-h-14 w-full rounded-[0.55rem] border border-[#c6a87a]/34 bg-[#fffaf2]/76 px-4 text-[1rem] text-[#2d2926] outline-none transition duration-200 placeholder:text-[#8a6a4a]/42 focus:border-[#7c1f2d]/56 focus:bg-[#fffdf8]"
          />
        </label>

        <label className="block">
          <span className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
            Email Address
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2.5 min-h-14 w-full rounded-[0.55rem] border border-[#c6a87a]/34 bg-[#fffaf2]/76 px-4 text-[1rem] text-[#2d2926] outline-none transition duration-200 placeholder:text-[#8a6a4a]/42 focus:border-[#7c1f2d]/56 focus:bg-[#fffdf8]"
          />
        </label>

        <label className="block">
          <span className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
            Phone Number
          </span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2.5 min-h-14 w-full rounded-[0.55rem] border border-[#c6a87a]/34 bg-[#fffaf2]/76 px-4 text-[1rem] text-[#2d2926] outline-none transition duration-200 placeholder:text-[#8a6a4a]/42 focus:border-[#7c1f2d]/56 focus:bg-[#fffdf8]"
          />
        </label>

        <label className="block">
          <span className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
            City
          </span>
          <input
            required
            name="city"
            autoComplete="address-level2"
            className="mt-2.5 min-h-14 w-full rounded-[0.55rem] border border-[#c6a87a]/34 bg-[#fffaf2]/76 px-4 text-[1rem] text-[#2d2926] outline-none transition duration-200 placeholder:text-[#8a6a4a]/42 focus:border-[#7c1f2d]/56 focus:bg-[#fffdf8]"
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
          Experience Level
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {experienceLevels.map((level) => (
            <label
              key={level}
              className="flex min-h-14 cursor-pointer items-center gap-3 rounded-[0.55rem] border border-[#c6a87a]/34 bg-[#fffaf2]/70 px-4 text-[0.96rem] text-[#4d3a2e] transition duration-200 focus-within:border-[#7c1f2d]/56 hover:border-[#c6a87a]/56"
            >
              <input
                required
                type="radio"
                name="experienceLevel"
                value={level}
                className="h-4 w-4 accent-[#7c1f2d]"
              />
              {level}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-[0.64rem] uppercase tracking-[0.24em] text-[#8a6a4a]">
          Message / Notes
        </span>
        <textarea
          name="message"
          rows={5}
          className="mt-2.5 w-full rounded-[0.55rem] border border-[#c6a87a]/34 bg-[#fffaf2]/76 px-4 py-4 text-[1rem] leading-[1.7] text-[#2d2926] outline-none transition duration-200 placeholder:text-[#8a6a4a]/42 focus:border-[#7c1f2d]/56 focus:bg-[#fffdf8]"
        />
      </label>

      <div className="pt-1">
        <button
          type="submit"
          className="flex min-h-14 w-full items-center justify-center rounded-full border border-[#7c1f2d] bg-[linear-gradient(180deg,#8b2736,#6d1b28)] px-8 py-3 text-[0.74rem] uppercase tracking-[0.20em] text-[#f5efe4] shadow-[0_6px_18px_rgba(124,31,45,0.18)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(124,31,45,0.24)] sm:w-auto sm:min-w-[15rem]"
        >
          Continue to Membership
        </button>
      </div>
    </form>
  );
}
