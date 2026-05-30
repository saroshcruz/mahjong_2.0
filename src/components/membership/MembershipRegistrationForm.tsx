"use client";

import { useState } from "react";

const experienceLevels = ["Beginner", "Intermediate", "Experienced"];

export default function MembershipRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[0.75rem] border border-[#c6a87a]/36 bg-[#fbf7ef]/76 px-6 py-7 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)] sm:px-8 sm:py-8">
        <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[#7c1f2d]">
          Registration Received
        </p>
        <h2 className="mt-4 text-[1.8rem] leading-tight text-[#2d2926] sm:text-[2.15rem]">
          Payment integration coming next.
        </h2>
        <p className="mx-auto mt-4 max-w-[38ch] text-[1rem] leading-[1.86] text-[#5d4d40]">
          Your membership details are ready for the next step. We will connect the payment flow after this registration step is finalized.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
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
