import Link from 'next/link';
import { Logo } from '../logo';
import { Badge } from '@turbostack/ui';

export function Footer() {
  return (
    <footer className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Logo />
              <span className="ml-4">TurboStack</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Ship your startup at turbo speed.
            </p>
            <a href="https://www.producthunt.com/posts/turbostack?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-turbostack" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=496376&theme=light" alt="TurboStack - Ship&#0032;your&#0032;startup&#0032;at&#0032;Turbo&#0032;Speed | Product Hunt" className="w-[250px] h-[54px] mt-4" width="250" height="54" /></a>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="#testimonials">Wall of Love</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><Link href="https://docs.turbostack.io">Docs</Link></li>
              <li><Link href="#faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><Link href="/tos">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-t-muted border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 TurboStack. All rights reserved.
            </div>
            <BuildWithTurboStack />
          </div>
        </div>
      </div>
    </footer>
  )
}

function BuildWithTurboStack() {
  return <Link passHref href={`https://turbostack.io?ref=${process.env.NEXT_PUBLIC_APP_DOMAIN}`}>
    <Badge variant="outline" className="px-4 py-2 rounded text-sm hover:bg-gray-50 flex space-x-2 font-medium text-foreground">
      <Logo className="w-6 h-6" />
      <span>Built with Turbo Stack</span>
    </Badge>
  </Link>
}