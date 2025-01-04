import { withAuth } from "@/lib/auth/session";
import { stripe } from '@/lib/stripe/server';
import { NextResponse } from "next/server";

export const POST = withAuth(async ({ project, req, session }) => {
  const { plan, period, returnUrl } = await req.json();

  const prices = await stripe.prices.list({
    lookup_keys: [`${plan}_${period}`],
  });

  const stripeSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    billing_address_collection: "required",
    success_url: returnUrl,
    cancel_url: returnUrl,
    line_items: [{ price: prices.data[0].id, quantity: 1 }],
    allow_promotion_codes: true,
    automatic_tax: {
      enabled: true,
    },
    tax_id_collection: {
      enabled: true,
    },
    mode: "subscription",
    client_reference_id: project.id,
    metadata: {
      customerId: session.user.id ?? null,
    },
  }, {});

  return NextResponse.json(stripeSession);
  
}, { requiredRole: ['owner'] })