import Image from 'next/image';

export function TalkMoreAboutYourProduct() {
  return (
    <section className="border-t py-24 md:py-32 ">
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl w-full mx-auto flex flex-col">
        <h1 className="text-3xl md:text-5xl text-center leading-[1.2] font-medium">
          Build a <span className="bg-clip-text text-transparent bg-gradient-to-br from-lime-500 via-green-600 to-green-700">scalable</span>, <span className="bg-clip-text text-transparent bg-gradient-to-br from-red-500 via-orange-500 to-pink-500">blazing fast</span> SaaS with Next.js and Turborepo
        </h1>
        <div className="mt-8 text-muted-foreground text-center font-normal text-md md:text-lg lg:text-xl flex flex-col">
          <h2>
            <span>
              We take care of the boring things, like Authentication, Multi-Tenancy, Profile Management, Stripe Payments, SEO and other stuff.
            </span>
          </h2>
        </div>
        <div className="mt-12">
          <TechsBackground />
        </div>
      </div>
    </section>
  )
}

function TechsBackground() {
  return (
    <Image src={"/_static/techs.svg"}
      alt="Techs behind TurboStack.io"
      width="3286" 
      height="2088"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
    />
  )
}