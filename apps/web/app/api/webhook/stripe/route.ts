import Stripe from "stripe";
import { stripe } from '@/lib/stripe/server';
import { NextResponse } from "next/server";
import { checkoutSessionCompleted } from "./handlers/checkout-session-completed";
import { checkoutSessionExpired } from "./handlers/checkout-session-expired";
import { customerSubscriptionUpdated } from "./handlers/customer-subscription-updated";
import { customerSubscriptionDeleted } from "./handlers/customer-subscription-deleted";
import { invoicePaid } from "./handlers/invoice-paid";
import { invoicePaymentFailed } from "./handlers/invoice-payment-failed";

const subscribedEvents = new Set([
  'checkout.session.completed',
  'checkout.session.expired',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed'
])

export async function POST(req: Request) {
  const buffer = await req.text();
  const signature = req.headers.get('Stripe-Signature') as string;
  const secret = process.env.STIRPE_WEBHOOK_SECRET as string;
  let event: Stripe.Event;
  try {
    if (!buffer || !signature) return;
    event = stripe.webhooks.constructEvent(buffer, signature, secret);

    if (!subscribedEvents.has(event.type)) {
      return new Response(`Unexpected event received: ${event.type}`, {
        status: 400
      })
    } 

    switch (event.type) {
      case 'checkout.session.completed':
        // The user paid successfully and the subscription was created (if any exists)
        // Here you should provide access to your customer and send him an email.
        // You can use ThankYouForPurchaseEmail.  
        await checkoutSessionCompleted(event);
        break;
      case 'checkout.session.expired':
        // The user didn't completed the transaction
        // You can optionally send an email to track the reasons behind it.
        await checkoutSessionExpired(event);
        break;
      case 'customer.subscription.updated':
        // The user updated it subscription for some reason, upgraded the plan, changed the quota, his payment method, etc.
        // You should check if something changed between your database and Stripe.
        await customerSubscriptionUpdated(event);
        break;
      case 'customer.subscription.deleted':
        // The subscription was canceled.
        // You should revoke the access.
        await customerSubscriptionDeleted(event);
        break;
      case 'invoice.paid':
        // A payment was made, triggered from a recurring subscription or a order payment.
        // You should provide acess to your customer and or emit a custom invoice.
        await invoicePaid(event);
        break;
      case 'invoice.payment_failed':
        // A payment failed, triggered from a recurring subscription or a order payment.
        // You should:
        //    Revoke Access based on some criteria (3 failed attemps)
        //    Send the user an email to update his payment method and wait the 'customer.subscription.deleted' event. 
        await invoicePaymentFailed(event);
        break;
    }
  } catch (err) {
    return new Response('We got an error from the stripe webhook', {
      status: 400
    });
  }

  return NextResponse.json({
    received: true
  })
}