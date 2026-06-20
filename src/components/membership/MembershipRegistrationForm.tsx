"use client";

import { useState } from "react";
import {
  coachingProgrammes,
  type CoachingProgrammeId,
} from "@/lib/coaching/programmes";
import {
  membershipTiers,
  type MembershipTierId,
} from "@/lib/membership/tiers";
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
  programmeId,
}: {
  tierId?: MembershipTierId;
  programmeId?: CoachingProgrammeId;
}) {
  const isCoachingProgramme = Boolean(programmeId);
  const tier = tierId ? membershipTiers[tierId] : null;
  const programme = programmeId ? coachingProgrammes[programmeId] : null;
  const itemName = programme?.name ?? tier?.name ?? "IMA Registration";
  const [registrationDetails, setRegistrationDetails] =
    useState<RegistrationDetails | null>(null);
  const [paymentReference, setPaymentReference] = useState<{
    paymentId: string;
    orderId: string;
    membershipId?: string;
    registrationId?: string;
    itemName?: string;
  } | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  if (paymentReference) {
    return (
      <div className="flex min-h-[34rem] flex-col items-center justify-center rounded-[0.75rem] border border-[#2f5d50]/28 bg-[#fbf7ef]/82 px-6 py-8 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)] sm:px-9 sm:py-10 lg:min-h-[38rem]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2f5d50]/38 bg-[#2f5d50]/10 text-[#2f5d50]">
          <svg
            aria-hidden="true"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.75 12.4 9.8 16.45 18.25 7.95"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </div>

        <p className="mt-6 text-[0.68rem] uppercase tracking-[0.26em] text-[#2f5d50]">
          Payment Successful
        </p>
        <h2 className="mt-4 max-w-[12ch] text-[2.1rem] leading-[1.05] text-[#2d2926] sm:max-w-none sm:text-[2.65rem]">
          {isCoachingProgramme
            ? "Programme registration confirmed"
            : "Welcome to the Indian Mahjong Association"}
        </h2>
        <p className="mx-auto mt-5 max-w-[34ch] text-[1rem] leading-[1.72] text-[#5d4d40]">
          {isCoachingProgramme
            ? `Your ${itemName} payment has been successfully confirmed.`
            : `Your ${itemName} has been successfully activated.`}
        </p>
        <p className="mx-auto mt-3 max-w-[42ch] text-[0.92rem] leading-[1.7] text-[#6f5848]">
          {isCoachingProgramme
            ? "The Indian Mahjong Association team will contact you with programme scheduling details."
            : "A confirmation email containing your membership details has been sent to your registered email address."}
        </p>

        <div className="mt-7 grid w-full max-w-[26rem] gap-4 border-y border-[#c6a87a]/34 py-5 text-left">
          {!isCoachingProgramme && paymentReference.membershipId && (
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8a6a4a]">
                Membership ID
              </p>
              <p className="mt-1 break-words text-[1.25rem] leading-snug text-[#2d2926]">
                {paymentReference.membershipId}
              </p>
            </div>
          )}
          {isCoachingProgramme && (
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8a6a4a]">
                Registration ID
              </p>
              <p className="mt-1 break-words text-[1.25rem] leading-snug text-[#2d2926]">
                {paymentReference.registrationId}
              </p>
            </div>
          )}
          {isCoachingProgramme && (
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8a6a4a]">
                Programme
              </p>
              <p className="mt-1 break-words text-[1.05rem] leading-snug text-[#2d2926]">
                {paymentReference.itemName ?? itemName}
              </p>
            </div>
          )}
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8a6a4a]">
              Payment ID
            </p>
            <p className="mt-1 break-words font-sans text-[0.9rem] leading-snug text-[#4d3a2e]">
              {paymentReference.paymentId}
            </p>
          </div>
        </div>

        <a
          href="/"
          className="mt-7 flex min-h-12 w-full max-w-[15rem] items-center justify-center rounded-full border border-[#7c1f2d] bg-[linear-gradient(180deg,#8b2736,#6d1b28)] px-7 py-3 text-[0.70rem] uppercase tracking-[0.20em] text-[#f5efe4] shadow-[0_6px_18px_rgba(124,31,45,0.18)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(124,31,45,0.24)]"
        >
          Return to Homepage
        </a>
      </div>
    );
  }

  if (registrationDetails) {
    return (
      <div className="rounded-[0.75rem] border border-[#c6a87a]/36 bg-[#fbf7ef]/76 px-6 py-7 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)] sm:px-8 sm:py-8">
        <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#7c1f2d]">
          Registration Received
        </p>
        <h2 className="mt-4 text-[1.8rem] leading-tight text-[#2d2926] sm:text-[2.15rem]">
          {isCoachingProgramme
            ? "Complete your programme payment."
            : "Complete your membership payment."}
        </h2>
        <p className="mx-auto mt-4 max-w-[38ch] text-[1rem] leading-[1.86] text-[#5d4d40]">
          {isCoachingProgramme
            ? "Your programme details are ready. Continue to Razorpay Standard Checkout to complete your registration."
            : "Your membership details are ready. Continue to Razorpay Standard Checkout to complete your registration."}
        </p>

        <div className="mt-7 flex justify-center">
          <RazorpayCheckout
            purchaseType={isCoachingProgramme ? "coaching" : "membership"}
            tierId={tierId}
            programmeId={programmeId}
            cta="Pay Securely"
            customer={registrationDetails}
            onSuccess={setPaymentReference}
          />
        </div>

      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const phone = String(formData.get("phone") ?? "");

        if (!/^[6-9]\d{9}$/.test(phone)) {
          setPhoneError("Please enter a valid 10-digit mobile number.");
          return;
        }

        setRegistrationDetails({
          fullName: String(formData.get("fullName") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone,
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
            inputMode="numeric"
            maxLength={10}
            pattern="[6-9][0-9]{9}"
            autoComplete="tel"
            onInput={(event) => {
              const input = event.currentTarget;
              input.value = input.value.replace(/\D/g, "").slice(0, 10);
              input.setCustomValidity("");
              if (phoneError) setPhoneError(null);
            }}
            onInvalid={(event) => {
              event.currentTarget.setCustomValidity(
                "Please enter a valid 10-digit mobile number."
              );
              setPhoneError("Please enter a valid 10-digit mobile number.");
            }}
            onChange={(event) => {
              event.currentTarget.setCustomValidity("");
            }}
            className="mt-2.5 min-h-14 w-full rounded-[0.55rem] border border-[#c6a87a]/34 bg-[#fffaf2]/76 px-4 text-[1rem] text-[#2d2926] outline-none transition duration-200 placeholder:text-[#8a6a4a]/42 focus:border-[#7c1f2d]/56 focus:bg-[#fffdf8]"
          />
          {phoneError && (
            <span className="mt-2 block text-[0.76rem] leading-[1.5] text-[#7c1f2d]">
              {phoneError}
            </span>
          )}
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
          {isCoachingProgramme
            ? "Continue to Programme"
            : "Continue to Membership"}
        </button>
      </div>
    </form>
  );
}
