import { Stripe, loadStripe } from '@stripe/stripe-js';

export const getStripe = async (): Promise<Stripe | null> => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PB_KEY as string | null;
  return loadStripe(
    key ?? ''
  )
}