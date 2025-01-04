import { withAuth } from "@/lib/auth/session";
import { stripe } from "@/lib/stripe/server";
import { APP_DOMAIN } from "@turbostack/utils";
import { NextResponse } from "next/server";

export const POST = withAuth(async ({ project }) => {
  if (!project.externalReferenceId) {
    return new Response('No Stripe External ID', { status: 400 })
  }

  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: project.externalReferenceId!,
      return_url: `${APP_DOMAIN}/${project.slug}/settings/billing`
    })
    return NextResponse.json({ url });
  } catch (error) {
    return new Response(error.raw_message, { status: 400 })
  }
}, { requiredRole: ['owner'] });