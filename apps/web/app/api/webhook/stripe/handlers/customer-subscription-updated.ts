import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { getPlanFromPriceId } from '@turbostack/utils';

export async function customerSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const priceId = subscription.items.data[0].price.id;
  const externalReferenceId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const newPlan = getPlanFromPriceId(priceId);

  const project = await prisma.project.findUnique({
    where: {
      externalReferenceId
    }
  })

  if (project!.plan !== newPlan!.code) {
    await prisma.project.update({
      where: {
        externalReferenceId
      },
      data: {
        plan: newPlan!.code,
        usersLimit: newPlan!.limits.users,
      }
    })
  }
}