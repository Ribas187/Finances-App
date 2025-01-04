'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@turbostack/ui";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useCurrentProject } from "@/lib/queries/use-current-project";
import { X } from "lucide-react";
import { UpgradePlanModal } from "./upgrade-plan-modal";

export function UpgradeToPro() {
  const [isVisible, setIsVisible] = useState(false);
  const { project } = useCurrentProject();

  useEffect(() => {
    if (!project) return;

    const { plan, slug } = project;

    if (Cookies.get('hideUpgradeBanner') !== slug || plan !== 'FREE') {
      setIsVisible(true);
    }
  }, [project]);

  return <>{isVisible && (<div className="mt-auto p-4">
      <Card>
        <CardHeader className="p-2 pt-0 md:p-4 relative">
          <CardTitle className="text-xl">Upgrade to Pro</CardTitle>
          <CardDescription>
            Unlock all features, obtain higher limits and get unlimited access.
          </CardDescription>
          <span 
            onClick={() => {
              setIsVisible(false);
              Cookies.set('hideUpgradeBanner', project?.slug, { expires: 1 })
            }}
            className="absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer"
            role="button"
          >
            <X className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <UpgradePlanModal title="Upgrade to Pro" />
        </CardContent>
      </Card>
    </div>
  )}</>
}