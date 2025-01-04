"use client";

import { Avatar } from "@turbostack/ui";
import { cn } from "@turbostack/utils";
import {
  HelpCircle,
  Home,
  LucideProps,
  Settings,
  SquareStack,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ComponentType, useContext } from "react";
import { Logo } from "../logo";
import { ProjectSelect } from "./project-select";
import { LayoutContext } from "./provider";

type MenuItem = {
  title: string;
  destination: string;
  icon: ComponentType<LucideProps>;
  wip?: boolean;
  beta?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    destination: "",
    icon: Home,
  },
  {
    title: "Categorias",
    destination: "/categories",
    icon: SquareStack,
  },
  {
    title: "Configurações",
    destination: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };
  const { data: session } = useSession();
  const user = session?.user;
  const { isSidebarOpen } = useContext(LayoutContext);

  return (
    <aside
      className={cn(
        "flex min-h-full w-[300px] flex-col border-r pt-4",
        `min-sm: ${
          isSidebarOpen ? "w-full translate-x-0" : "hidden -translate-x-full"
        }`,
      )}
    >
      <header className="flex items-center space-x-2 px-6">
        <Logo className="h-6 w-6" />
        <h1 className="text-xl font-semibold">FinancesApp</h1>
      </header>
      <div className="mt-5 px-3">
        <ProjectSelect />
      </div>
      <nav className="mt-4 flex flex-1 flex-col gap-2 px-3">
        {menuItems.map(({ destination, title, icon: Icon }) => {
          const currentPath = `/${slug}${destination}`;

          return (
            <Link
              key={destination}
              href={currentPath}
              className={cn(
                "hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all",
                (destination !== "" && pathname.includes(destination)) ||
                  pathname === currentPath
                  ? "bg-muted text-foreground"
                  : "bg-background text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <p>{title}</p>
            </Link>
          );
        })}
      </nav>
      {/* <UpgradeToPro /> */}
      <div className="mb-4 flex flex-col gap-2 px-3">
        <Link
          href="/help"
          className={cn(
            "hover:bg-muted hover:text-foreground bg-background text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all",
          )}
        >
          <HelpCircle className="h-4 w-4" />
          <p>Ajuda & suporte</p>
        </Link>
      </div>
      <Link href={`/${slug}/profile`}>
        <footer className="hover:bg-muted flex cursor-pointer items-center space-x-2 overflow-hidden border-t px-3 py-4 transition-all  ">
          <Avatar fallback={user?.email} image={user?.image}></Avatar>
          <div className="flex flex-1 flex-col overflow-hidden text-sm">
            <p className="text-foreground truncate font-semibold">
              {user?.name ?? user?.email}
            </p>
            <p className="text-muted-foreground truncate">{user?.email}</p>
          </div>
        </footer>
      </Link>
    </aside>
  );
}

export default Sidebar;
