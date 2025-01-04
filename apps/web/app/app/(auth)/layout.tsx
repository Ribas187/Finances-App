import { Background } from "@turbostack/ui";
import { ReactElement } from "react";

export const runtime = "edge";

export default function AuthLayout({ children }: { children: ReactElement }) {
  return (
    <div className="flex h-screen w-screen justify-center">
      <Background />
      {children}
    </div>
  );
}
