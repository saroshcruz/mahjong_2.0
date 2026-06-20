export const coachingProgrammes = {
  advanced: {
    id: "advanced",
    name: "Advanced Coaching Programme",
    displayName: "ADVANCED COACHING PROGRAMME",
    amount: 1500000,
    price: "₹15,000",
    duration: "15 Hours of Instruction",
    format: "5 Guided Sessions",
    taxNote: "No GST",
    summary:
      "For members seeking structured instruction, guided strategy and table experience.",
    accentRgb: "124,31,45",
  },
} as const;

export type CoachingProgrammeId = keyof typeof coachingProgrammes;

export function isCoachingProgrammeId(
  value: unknown
): value is CoachingProgrammeId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(coachingProgrammes, value)
  );
}
