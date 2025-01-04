import { Pricing as InnerPricing } from '@/components/billing/pricing';

export function Pricing() {
  return (
    <section className="border-t py-24 md:py-32" id="pricing">
      <div className="px-4 sm:px-6 lg:px-8 container w-full mx-auto flex flex-col">
        <h1 className="text-3xl md:text-5xl text-center leading-[1.2] font-medium">
          Simple & affordable pricing
        </h1>
        <div className="mt-8 text-muted-foreground text-center font-normal text-md md:text-lg lg:text-xl flex flex-col">
          <h2>
            <span>
              Save hours of repetitive code! Ship at Turbo
            </span>
          </h2>
        </div>
        <div className="mt-8 max-w-5xl mx-auto w-full">
          <InnerPricing />
        </div>
      </div>
    </section>
  )
}