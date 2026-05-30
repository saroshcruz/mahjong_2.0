export const membershipTiers = {
  pearl: {
    name: "Pearl Membership",
    displayName: "PEARL MEMBERSHIP",
    amount: 100000,
    price: "₹1,000",
    duration: "1 Year Membership",
    summary: "For beginning your place at the IMA table.",
    accentRgb: "198,168,122",
  },
  jade: {
    name: "Jade Membership",
    displayName: "JADE MEMBERSHIP",
    amount: 400000,
    price: "₹4,000",
    duration: "5 Year Membership",
    summary: "For members returning with rhythm, study and community.",
    accentRgb: "47,93,80",
  },
  ruby: {
    name: "Ruby Membership",
    displayName: "RUBY MEMBERSHIP",
    amount: 1000000,
    price: "₹10,000",
    duration: "Lifetime Membership",
    summary: "For members helping shape the long life of Mahjong in India.",
    accentRgb: "124,31,45",
  },
} as const;

export type MembershipTierId = keyof typeof membershipTiers;

export function isMembershipTierId(value: unknown): value is MembershipTierId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(membershipTiers, value)
  );
}
