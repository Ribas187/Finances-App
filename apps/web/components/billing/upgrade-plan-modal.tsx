import { useCurrentProject } from "@/lib/queries/use-current-project";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Switch } from "@turbostack/ui";
import { Pricing } from "./pricing";
import { APP_DOMAIN, Plan, PlanPeriod } from "@turbostack/utils";
import { usePathname, useSearchParams } from "next/navigation";

export function UpgradePlanModal({ title = 'Upgrade' }: { title?: string }) {
  const { project } = useCurrentProject();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const { plan: currentPlan } = project ?? {};

  async function handlePlanChoosed({ plan, period }: { plan: Plan, period: PlanPeriod }) {
    await fetch(`/api/projects/${project!.slug}/billing/upgrade`, {
      body: JSON.stringify({
        plan,
        period,
        returnUrl: `${APP_DOMAIN}${pathname}${queryString.length > 0 ? `?${queryString}` : ""}`
      })
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-auto">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl py-16 px-24">
        <DialogHeader className="flex">
          <DialogTitle className="text-4xl font-semibold text-center">Simple & Affordable Prices</DialogTitle>
          <DialogDescription className="mt-4 text-lg text-muted-foreground text-center">Get started for free, update when you need.</DialogDescription>
        </DialogHeader>

        <Pricing currentPlan={currentPlan} onPlanChoosed={handlePlanChoosed} />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Prices listed in USD. Taxes may apply. By upgrading you agree to our <a href="#" className="underline">Terms of Service</a>.
        </div>
      </DialogContent>
    </Dialog>
  )
}