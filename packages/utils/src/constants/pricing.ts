import { z } from 'zod';

const LimitSchema = z.object({
  users: z.number()
})

export type Limits = z.infer<typeof LimitSchema>;

export type PlanPeriod = 'monthly' | 'yearly';

type PlanFeature = {
  text: string,
}

export type Plan = {
  title: string;
  description?: string;
  code: string;
  prices: {
    monthly: number | null;
    yearly: number | null;
    ids: string[];
  };
  limits: Limits;
  recommended: boolean;
  features: PlanFeature[]
  cta: string;
}

export const PLANS: Plan[] = [
  {
    title: 'Hobby',
    code: 'FREE',
    prices: {
      monthly: 0,
      yearly: 0,
      ids: []
    },
    limits: {
      users: 1,
    },
    recommended: false,
    features: [
      { text: '1 seat' },
      { text: '1-year data retention' },
      { text: 'Basic Analytics' },
      { text: 'Basic Support' },
    ],
    cta: 'Get started for Free',
  },
  {
    title: 'Pro',
    code: 'PRO',
    description: 'Everything on Hobby, plus:',
    prices: {
      monthly: 30,
      yearly: 25,
      ids: []
    },
    limits: {
      users: 10
    },
    recommended: true,
    features: [
      { text: '10 seats' },
      { text: '3-year data retention' },
      { text: 'Advanced Analytics' },
      { text: 'Priority Support' },
    ],
    cta: 'Upgrade to Pro',
  },
  {
    title: 'Enterprise',
    description: 'Everything on Pro, plus:',
    code: 'ENTERPRISE',
    prices: {
      monthly: null,
      yearly: null,
      ids: []
    },
    limits: {
      users: 25
    },
    recommended: false,
    features: [
      { text: 'Unlimited Seats' },
      { text: '10-year data retention' },
      { text: '99.99% SLA' },
      { text: 'Advanced Support' },
    ],
    cta: 'Contact Sales'
  }
];

export const FREE_PLAN = PLANS.find(plan => plan.code === 'FREE');

export function getPlanFromPriceId(priceId: string) {
  return PLANS.find(plan => plan.prices.ids.includes(priceId)) ?? null;
}

export function getPlanFromPlanCode(code: string | undefined) {
  return PLANS.find(plan => plan.code === code) ?? null;
}

export function getPlanFromTitle(title: string | undefined) {
  return PLANS.find(plan => plan.title.toLowerCase() === title) ?? null;
}