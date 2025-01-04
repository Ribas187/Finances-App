'use client'

import { ManageAccountButton } from "@/components/billing/manage-account-button";
import { UpgradePlanModal } from "@/components/billing/upgrade-plan-modal";
import { ProjectUsage } from "@/components/projects/project-usage";
import { useCurrentProject } from "@/lib/queries/use-current-project";
import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@turbostack/ui";
import { FREE_PLAN, getPlanFromPlanCode } from "@turbostack/utils";

export default function ProjectBillingPageClient() {
  const { project } = useCurrentProject();

  const plan = getPlanFromPlanCode(project?.plan);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between w-full items-center">
            <p>Plan & Usage</p>
            {plan && plan.code !== FREE_PLAN?.code && <ManageAccountButton />}
          </CardTitle>
          <CardDescription className="">
              You're currently on <Badge className="text-xs mx-1">{plan?.title}</Badge> plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ProjectUsage project={project} />
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t py-4">
          <p className="text-sm text-muted-foreground">To increase your limits, upgrade your plan</p>
          <div className="w-auto">
            <UpgradePlanModal />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}