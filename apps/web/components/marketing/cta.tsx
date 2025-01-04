import { Button } from "@turbostack/ui";

export function CTA() {
  return (
    <section className="py-12 md:py-28 bg-primary text-primary-foreground rounded">
      <div className="px-4 sm:px-6 lg:px-8 container w-full mx-auto flex flex-col">
        <div className="mt-6 mx-auto text-center">
          <h1 className="text-3xl md:text-5xl text-center leading-tight font-medium">
            Ship your startup everywhere, in no time.
          </h1>
          <div className="mt-8 text-center font-normal text-md md:text-lg lg:text-xl flex flex-col">
            <h2>
              Save months of development time and spent your time focusing on make money.
            </h2>
          </div>

          <Button className="mt-8 md:text-lg p-8 bg-accent text-primary">Get TurboStack</Button>
        </div>
      </div>
    </section>
  )
}