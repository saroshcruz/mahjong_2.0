const baseMembershipTiers = {
  pearl: {
    name: "Pearl Membership",
    displayName: "PEARL MEMBERSHIP",
    amount: 150000,
    price: "₹1,500",
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
    name: "Ruby Lifetime Membership",
    displayName: "RUBY MEMBERSHIP",
    amount: 1000000,
    price: "₹10,000",
    duration: "Lifetime Membership",
    summary: "For members helping shape the long life of Mahjong in India.",
    accentRgb: "124,31,45",
  },
} as const;

const stagingTestMembershipTier = {
  name: "Test Membership",
  displayName: "TEST MEMBERSHIP",
  amount: 1000,
  price: "₹10",
  duration: "Payment Flow Test",
  summary: "Temporary staging-only payment verification tier.",
  accentRgb: "124,31,45",
} as const;

export const membershipTiers = {
  ...baseMembershipTiers,
  test: stagingTestMembershipTier,
} as const;

export type MembershipTierId = keyof typeof membershipTiers;

export function isStagingPaymentTestEnabled() {
  const branch =
    process.env.VERCEL_GIT_COMMIT_REF ??
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
  const deploymentUrl =
    process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? "";

  return (
    process.env.NEXT_PUBLIC_ENABLE_TEST_MEMBERSHIP === "true" ||
    branch === "staging" ||
    deploymentUrl.includes("-git-staging-")
  );
}

export function getVisibleMembershipTierIds() {
  const tierIds = Object.keys(baseMembershipTiers) as MembershipTierId[];

  if (isStagingPaymentTestEnabled()) {
    return [...tierIds, "test" as MembershipTierId];
  }

  return tierIds;
}

export function isMembershipTierId(value: unknown): value is MembershipTierId {
  if (value === "test") {
    return isStagingPaymentTestEnabled();
  }

  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(baseMembershipTiers, value)
  );
}
