import { Navbar } from "@turbostack/ui";
import React from "react";

export default function ProjectSettingsLayout({ params: { slug }, children }: { params: { slug: string }, children?: React.ReactNode }) {
  const navigation = [
    {
      label: "Geral",
      href: `/${slug}/settings`,
      segment: null,
    },
    {
      label: "Membros",
      href: `/${slug}/settings/team`,
      segment: "team",
    },
    // {
    //   label: "Billing",
    //   href: `/${slug}/settings/billing`,
    //   segment: "billing",
    // },
  ];

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="mt-2 text-muted-foreground">Configurações do seu projeto</p>
        <Navbar className="mt-5" navigation={navigation} />
        <div className="mt-6">
          {children}
        </div>
      </div>
    </>
  )
}