import { Button } from "@turbostack/ui";

export function Hero() {
  return (
    <>
      <div className="mt-32 md:mt-48 md:mb-12 px-4 sm:px-6 lg:px-8 container w-full mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-8xl text-center leading-lg font-medium max-w-">
          <div className="lg:leading-tight">Ship your startup</div>
          <div>
            at
            <span className="ml-3 sm:ml-4 md:ml-5 relative whitespace-nowrap">
              <span className="absolute bg-primary -left-2 -z-10 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
              <span className="text-primary-foreground">
                turbo speed
              </span>
            </span>
          </div>
        </h1>

        <h2 className="text-muted-foreground font-normal mt-8 text-md md:text-lg lg:text-xl text-center">
          The only NextJS boilerplate that you need to ship your SaaS <br />
          and make money since your first day.
        </h2>

        <Button className="w-full md:max-w-[320px] mt-8">
          Get TurboStack
        </Button>
      </div>
      <MainAsset />
    </>
  )
}

function MainAsset() {
  return (
    <div className="mt-16 mb-32 px-4 sm:px-6 lg:px-8 container w-full mx-auto flex flex-col items-center">
      <img className="mt-10 rounded border w-full" src="/_static/main.png" alt="Main image for TurboStack.io" />
    </div>
  )
}