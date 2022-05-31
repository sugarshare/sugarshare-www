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

export function getPriceId(tier: SubscriptionTier, isYearly: boolean): string | null {
  return isYearly === true
    ? PRICE_ID[tier].yearly
    : PRICE_ID[tier].monthly;
}
