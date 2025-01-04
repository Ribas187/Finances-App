'use client';

import { Badge, Button, Switch } from '@turbostack/ui';
import { Plan, PlanPeriod, PLANS } from '@turbostack/utils';
import { Check } from "lucide-react";
import { useState } from 'react';

export function Pricing({ currentPlan, onPlanChoosed }: { 
  currentPlan?: string, 
  onPlanChoosed?: ({ plan }: { plan: Plan, period: PlanPeriod }) => Promise<void> 
}) {
  const [annualBilled, setAnnualBilled] = useState(false);
  const period: PlanPeriod = annualBilled ? 'yearly' : 'monthly'

  return (
    <>
      <div className="relative mt-8 flex justify-center items-center gap-4">
        <span>Monthly</span>
        <Switch
          checked={annualBilled}
          onClick={() => setAnnualBilled(!annualBilled)}
        />
        <span>
          Yearly
          <Badge className="ml-2 text-xs">Save 20%</Badge>
        </span>
      </div>
      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3 relative justify-center">
        {PLANS.map((plan, index) => (
          <div key={index} className={`flex flex-col p-6 rounded-lg border ${plan.recommended && 'border-2 border-primary relative z-10'}`}>
            {plan.recommended && (
              <Badge className="absolute z-1 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold py-1 px-3">
                Recommended
              </Badge>
            )}
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            <div className="mt-2 text-3xl font-bold">
              {plan.code === 'ENTERPRISE' && 'Custom'}
              {plan.code === 'FREE' && 'Free'}
              {plan.code === 'PRO' && <>
                $ {plan.prices[period]}
                <span className="ml-2 text-base font-normal text-muted-foreground">per month{period === 'yearly' && ', billed yearly'}</span>
              </>}
            </div>
            <ul className="mt-6 space-y-3 flex-grow">
              {plan.description && <h4 className="text-sm text-muted-foreground">{plan.description}</h4>}
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6"
              variant={plan.recommended ? 'default' : 'outline'}
              disabled={currentPlan === plan.code}
              onClick={() => onPlanChoosed && onPlanChoosed({ plan, period })}
            >
              {currentPlan === plan.code ? 'Your current plan' : plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}