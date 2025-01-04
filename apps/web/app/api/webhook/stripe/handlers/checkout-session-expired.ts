import { sendEmail } from "@/lib/emails";
import Stripe from "stripe";

export async function checkoutSessionExpired(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  await sendEmail({ 
    to: session.customer_email!,
    subject: 'Do you have any Feedbacks about TurboStack?',
    text: `Hey, it's Vitor here!\n\nI noticed that you didn't proceed with your purchase on TurboStack...`
  })
}