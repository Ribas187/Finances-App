'use client';

import { Button } from '@turbostack/ui';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../logo';

const menu = [
  {
    href: '#pricing',
    label: 'Pricing'
  },
  {
    href: 'https://docs.turbostack.io',
    label: 'Docs'
  },
  {
    href: '#testimonials',
    label: 'Wall of Love'
  },
  {
    href: '#faq',
    label: 'FAQ'
  }
]

function DesktopMenu() {
  return (
    <div className="ml-10 flex justify-between w-full">
      <nav className="hidden md:flex items-center space-x-1">
        <div className="p-0.5 flex space-x-4">
          {menu.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-0.5 font-normal text-muted-foreground hover:text-foreground"
            >{item.label}</Link>
          ))}
        </div>
      </nav>
      <div className="hidden md:flex items-center">
        <Button>Get TurboStack</Button>
      </div>
    </div>
  )
}

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <div className="md:hidden flex items-center">
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open menu</span>
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-20 inset-x-0 px-4 py-2 transition transform origin-top-right z-20 flex flex-col bg-white shadow-sm`}
      >
        {menu.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-1.5 text-sm font-normal text-muted-foreground hover:text-foreground rounded-full"
          >{item.label}</Link>
        ))}

        <div className="mt-4 px-2 w-full">
          <Button>Get TurboStack</Button>
        </div>
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="py-6 w-full fixed top-0 bg-white z-20 border-b">
      <div className="md:container md: mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
          </Link>
          <DesktopMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}