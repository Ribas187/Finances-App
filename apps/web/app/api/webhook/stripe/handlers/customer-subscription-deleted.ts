
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { FREE_PLAN } from '@turbostack/utils';

export async function customerSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const externalReferenceId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  /*
    PRO TIP: To revoke access, we need to downgrade the plan to the free and update the user limits

    Now you have two options:
      1. Revoke Access to all the users associated to this project
      2. Allow them but readonly access.
  */
  await prisma.project.update({
    where: {
      externalReferenceId
    },
    data: {
      plan: FREE_PLAN!.code,
      usersLimit: FREE_PLAN!.limits.users,
    }
  })
}