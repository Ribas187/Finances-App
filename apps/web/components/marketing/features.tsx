'use client';

import { Badge, Button } from "@turbostack/ui";
import { Building2, DollarSign, KeyRound, LucideIcon, Mail, Search, ChartNoAxesColumn, Plus, Component, ShieldCheck, EarthIcon, Terminal, Rss, MessageCircleHeart, CalendarCheck2 } from "lucide-react"
import { useState } from "react";
import { FeatureSingle } from "./feature-single";
import Image from "next/image";

const features = [
  {
    icon: KeyRound,
    title: 'Authentication',
    description: 'Full authentication flow, including magic link and social login.'
  },
  {
    icon: DollarSign,
    title: 'Billing Subscriptions',
    description: 'Manage your billing and subscriptions with Stripe.'
  },
  {
    icon: Terminal,
    title: 'CLI',
    description: 'Create a new app with a single command, right from your terminal.',
    wip: true
  },
  {
    icon: Search,
    title: 'SEO, Sitemaps & Marketing',
    description: 'All of your pages is SEO Optimized, so you can focus on your backlinks.'
  },
  {
    icon: Mail,
    title: 'Emails',
    description: 'Send e-mails and don\'t end at spam folder with Resend.'
  },
  {
    icon: ChartNoAxesColumn,
    title: 'Dashboard',
    description: 'A beautiful dashboard, made with shadcn and Recharts.'
  },
  {
    icon: Component,
    title: 'UI Kit',
    description: 'Beautifuk, fully-customizable Ui components and landing page blocks'
  },
  {
    icon: EarthIcon,
    title: 'Internationalization',
    description: 'Reach a global audience with multi-language out of the box.',
    wip: true,
  },
  {
    icon: ShieldCheck,
    title: 'Admin Panel',
    description: 'Manage all users, ban abusers, update plans and see overall performance out of the box.',
    wip: true
  },
  {
    icon: Rss,
    title: 'Integrated Blog',
    description: 'Keep users informed, create content with built-in content management.',
    wip: true
  },
  {
    icon: MessageCircleHeart,
    title: 'Track Feedbacks',
    description: 'Gather and organize feedback effortlessly to enhance your projects and drive continuous improvement.',
    wip: true
  },
  {
    icon: CalendarCheck2,
    title: 'Cron Jobs',
    description: 'Create cron jobs to send transactional emails, update plans, and automate tasks!',
    wip: true
  }
]

export function Features() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  return (
    <section className="border-t py-12 md:py-28 ">
      <div className="px-4 sm:px-6 lg:px-8 container w-full mx-auto flex flex-col">
        <div className="text-center">
          <Badge className="mx-auto w-auto text-md font-medium rounded-xl bg-primary/10 hover:bg-primary/10 text-primary">🚀 All-in-one solution out of the box</Badge>
        </div>
        <div className="mt-6 max-w-3xl mx-auto">
          <h1 className="text-3xl max-w-3xl md:text-5xl text-center leading-tight font-medium">
            Game-changing features to launch your startup really fast!
          </h1>
          <div className="mt-8 max-w-3xl text-muted-foreground text-center font-normal text-md md:text-lg lg:text-xl flex flex-col">
            <h2>
              Everything you need to launch your SaaS in no time. We take care of the boring stuff, to allow you focus on build your brand.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {(showAllFeatures ? features : features.slice(0, 6)).map(feature => (
            <Feature
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              wip={feature.wip}
            />
          ))}
        </div>
        {!showAllFeatures && (
          <div className="flex justify-center py-8 px-2">
            <Button variant="outline" onClick={() => setShowAllFeatures(true)}><Plus className="mr-4 text-primary" /> Check all features</Button>
          </div>
        )}
      </div>
    </section>
  )
}

function Feature({ icon: Icon, title, description, wip = false }: { icon: LucideIcon, title: string, description: string, wip?: boolean }) {
  return (
    <div className="flex flex-col items-start border shadow-sm hover:shadow-lg transition-all rounded p-6">
      <div className="flex justify-between space-x-2 w-full items-center">
        <Icon className="text-primary w-8 h-8" />
        {wip && <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Coming soon</Badge>}
      </div>
      <div className="flex flex-col mt-6 space-y-1 font-normal md:text-md">
        <p>{title}</p>
        <span className="text-muted-foreground">{description}</span>
      </div>
    </div>
  )
}