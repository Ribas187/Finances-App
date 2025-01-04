"use client";

import { DialogProvider } from "@/components/dialog/provider";
import { LayoutProvider } from "@/components/layout/provider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({ children }: { children?: ReactNode }) {
  return (
    <SessionProvider>
      <DialogProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </DialogProvider>
    </SessionProvider>
  );
}
