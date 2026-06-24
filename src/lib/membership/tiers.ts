export const membershipTiers = {
  pearl: {
    name: "Pearl Membership",
    displayName: "PEARL MEMBERSHIP",
    amount: 165000,
    price: "₹1,650",
    duration: "1 Year Membership",
    summary: "For beginning your place at the IMA table.",
    accentRgb: "198,168,122",
  },
  jade: {
    name: "Jade Membership",
    displayName: "JADE MEMBERSHIP",
    amount: 450000,
    price: "₹4,500",
    duration: "5 Year Membership",
    summary: "For members returning with rhythm, study and community.",
    accentRgb: "47,93,80",
  },
  ruby: {
    name: "Ruby Lifetime Membership",
    displayName: "RUBY MEMBERSHIP",
    amount: 1100000,
    price: "₹11,000",
    duration: "Lifetime Membership",
    summary: "For members helping shape the long life of Mahjong in India.",
    accentRgb: "124,31,45",
  },
} as const;

export type MembershipTierId = keyof typeof membershipTiers;

export function getVisibleMembershipTierIds() {
  return Object.keys(membershipTiers) as MembershipTierId[];
}

export function isMembershipTierId(value: unknown): value is MembershipTierId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(membershipTiers, value)
  );
}
