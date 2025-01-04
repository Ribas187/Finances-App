import Stripe from 'stripe';

export async function invoicePaid(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice
}