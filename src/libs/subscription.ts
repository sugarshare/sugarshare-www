export enum SubscriptionTier {
  FREE = 'Free',
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
}

const PRICE_ID = {
  [SubscriptionTier.FREE]: {
    monthly: null,
    yearly: null,
  },
  [SubscriptionTier.STANDARD]: {
    monthly: 'price_1KmD1lFJFAGDCGYEbWBkY4hc',
    yearly: 'price_1KmD1HFJFAGDCGYEFWTjIuIG',
  },
  [SubscriptionTier.PREMIUM]: {
    monthly: 'price_1KmDFiFJFAGDCGYEpyo3kTjC',
    yearly: 'price_1KmDDdFJFAGDCGYEsP4hBTO5',
  },
};

export function parseTier(rawTier: string | null): SubscriptionTier | null {
  if (!rawTier) {
    return null;
  }

  return Object.entries(SubscriptionTier)
    .find(([, v]: [string, SubscriptionTier]) => rawTier.toLowerCase() === v.toLowerCase())
    ?.[1] ?? null;
}

export function getPriceId(tier: SubscriptionTier, isYearly: boolean): string | null {
  return isYearly === true
    ? PRICE_ID[tier].yearly
    : PRICE_ID[tier].monthly;
}
