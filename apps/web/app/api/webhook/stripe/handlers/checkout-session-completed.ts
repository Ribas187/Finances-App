import Stripe from "stripe";
import { stripe } from '@/lib/stripe/server';
import { getPlanFromPriceId } from "@turbostack/utils";
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/emails";
import { UpgradeEmail } from '@turbostack/emails';

export async function checkoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  const priceId = subscription.items.data[0].price.id;
  const plan = getPlanFromPriceId(priceId);

  if (!plan) {
    /*
      There is an error because a session was completed with a incorrect priceId, 
      you should log this and investigate it.
    */
    return;
  }

  const externalReferenceId = session.customer!.toString();
  const projectId = session.client_reference_id!;
  const newPlan = plan.code;

  const project = await prisma.project.update({
    where: {
      id: projectId
    },
    data: {
      externalReferenceId,
      plan: newPlan,
      usersLimit: plan.limits.users,
      billingEndsAt: new Date(subscription.current_period_end * 1000)
    },
    select: {
      users: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }
    }
  })

  /*
    PRO TIP: Send an email to all users of the project thanking for the purchase.
  */
  await Promise.allSettled(
    project.users.map(data => {
      sendEmail({
        to: data.user.email!,
        subject: 'Thank you for your purchase at TurboStack.io',
        react: UpgradeEmail({
          name: data.user.name!,
          email: data.user.email!,
          plan: plan!.title
        })
      })
    })
  )
}