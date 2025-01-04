import Stripe from 'stripe';

export async function invoicePaymentFailed(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice
}