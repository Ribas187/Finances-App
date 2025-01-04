'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@turbostack/utils';
import { ComponentType, useContext } from 'react';
import { Home, Settings, LucideProps, HelpCircle } from 'lucide-react';
import { ProjectSelect } from './project-select';
import { Avatar } from '@turbostack/ui';
import { useSession } from 'next-auth/react';
import { Logo } from '../logo';
import { UpgradeToPro } from '../billing/upgrade-to-pro';
import { LayoutContext } from './provider';

type MenuItem = {
  title: string;
  destination: string;
  icon: ComponentType<LucideProps>
  wip?: boolean;
  beta?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    destination: '',
    icon: Home
  },
  {
    title: 'Configurações',
    destination: '/settings',
    icon: Settings,
  }
]

export function Sidebar() {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string }
  const { data: session } = useSession();
  const user = session?.user;
  const {isSidebarOpen} = useContext(LayoutContext);

  return (
    <aside className={cn('flex flex-col w-[300px] pt-4 border-r min-h-full', `min-sm: ${isSidebarOpen ? 'w-full translate-x-0' : 'hidden -translate-x-full'}`)}>
      <header className="flex space-x-2 px-6 items-center">
        <Logo className="h-6 w-6" />
        <h1 className="font-semibold text-xl">FinancesApp</h1>
      </header>
      <div className="px-3 mt-5">
        <ProjectSelect />
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-3 mt-4">
        {menuItems.map(({ destination, title, icon: Icon }) => {
          const currentPath = `/${slug}${destination}`;

          return (
            <Link
              key={destination}
              href={currentPath}
              className={cn('flex gap-2 px-3 py-2 items-center rounded-md text-sm transition-all hover:bg-muted hover:text-foreground',
                (destination !== '' && pathname.includes(destination)) || pathname === currentPath ? 'bg-muted text-foreground' : 'bg-background text-muted-foreground')}
            >
              <Icon className="h-4 w-4" />
              <p>{title}</p>
            </Link>
          )
        })}
      </nav>
      {/* <UpgradeToPro /> */}
      <div className="flex flex-col gap-2 px-3 mb-4">
        <Link
          href="/help"
          className={cn('flex gap-2 px-3 py-2 items-center rounded-md text-sm transition-all hover:bg-muted hover:text-foreground bg-background text-muted-foreground')}
        >
          <HelpCircle className="h-4 w-4" />
          <p>Ajuda & suporte</p>
        </Link>
      </div>
      <Link href={`/${slug}/profile`}>
        <footer className="px-3 py-4 border-t flex items-center space-x-2 overflow-hidden hover:bg-muted transition-all cursor-pointer  ">
          <Avatar fallback={user?.email} image={user?.image}></Avatar>
          <div className="flex flex-col text-sm flex-1 overflow-hidden">
            <p className="font-semibold text-foreground truncate">{user?.name ?? user?.email}</p>
            <p className="text-muted-foreground truncate">{user?.email}</p>
          </div>
        </footer>
      </Link>
    </aside>
  )
}

export default Sidebar;