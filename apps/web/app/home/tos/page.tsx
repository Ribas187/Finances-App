import { Logo } from "@/components/logo";

export default function TermsOfServicePage() {
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-3xl mx-auto p-6 py-12">
        <header className="flex items-center space-x-4">
          <Logo />
          <h1 className="text-3xl font-semibold">Terms and conditions</h1>
        </header>
        <article className="mt-12 flex flex-col space-y-8 text-muted-foreground">
          {/* PRO TIP: Uses the following prompt on ChatGPT to generate your terms and conditions page. */}
        </article>
      </div>
    </div>
  )
}