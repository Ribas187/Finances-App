import { Logo } from "@/components/logo";
import { Button, Discord } from "@turbostack/ui";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden">
      <div className="max-w-3xl mx-auto min-h-screen flex flex-col justify-center p-6">
        <Logo className="w-12 h-12" />
        <h1 className="font-semibold text-5xl mt-8">Welcome to TurboStack</h1>
        <code className="my-8 w-full rounded">
          <ol className="list-inside list-decimal text-md text-center sm:text-left">
            <li className="mb-2">Follow the Get Started tutorial to setup a beautiful landing page.</li>
            <li>Make it online.</li>
          </ol>
        </code>
        <div className="flex space-x-4 space-between w-full">
          <Link passHref href="https://docs.turbostack.io" target="_blank">
            <Button className="text-md p-6">Go to the docs <ArrowRightCircle className="ml-4" /></Button>
          </Link>
          <Link passHref href="https://discord.gg" target="_blank">
            <Button variant="outline" className="text-md p-6">Join our Community <Discord className="ml-4 text-foreground w-8 h-8" /></Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
