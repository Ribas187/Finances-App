import Sidebar from "@/components/layout/sidebar";
import { Providers } from "../providers";
import { Toolbar } from "@/components/layout/toolbar";
import { ProjectAuth } from "./auth";

export const dynamic = "force-static";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <ProjectAuth>
        <main className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Toolbar />
            <div className="flex-1 relative overflow-y-auto w-full">
              <div className="px-4 py-8 absolute inset-x-0 inset-y-0 ">
                {children}
              </div>
            </div>
          </div>
        </main>
      </ProjectAuth>
    </Providers>
  )
}