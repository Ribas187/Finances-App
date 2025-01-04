"use client";

import { cn } from "@turbostack/utils";
import { Bell, LogOut, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { UpgradePlanModal } from "../billing/upgrade-plan-modal";
import { LayoutContext } from "./provider";

type ToolbarProps = {
  hideProjectSelect?: boolean;
};

export function Toolbar({ hideProjectSelect }: ToolbarProps) {
  const { setIsSidebarOpen } = useContext(LayoutContext);

  return (
    <div
      className={cn("flex w-full items-center justify-end gap-3 border-b p-4")}
    >
        <div className="min-sm:hidden">
          <Menu
            onClick={() => setIsSidebarOpen((state) => !state)}
            className="hover:bg-muted h-10 w-10 cursor-pointer rounded-full p-2 transition-all"
          />
        </div>
      <div className="flex flex-1 items-center justify-end space-x-1">

        {/* <UpgradePlanModal /> */}
        <Bell className="hover:bg-muted h-8 w-8 cursor-pointer rounded-full p-2 transition-all" />
        <LogOut
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="hover:bg-muted h-8 w-8 cursor-pointer rounded-full p-2 transition-all"
        />
      </div>
    </div>
  );
}
