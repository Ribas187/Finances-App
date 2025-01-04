import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@turbostack/ui";

type Question = {
  title: string;
  description: string;
}

const questions: Question[] = [
  {
    title: 'What do I get exactly?',
    description:
      `1 - The NextJS starter with all the boilerplate code you need to run an online business: a payment sistem, a database, a login system, UI components and more.
<br /><br />
2 - The documentation to help you set your app from scratch and make it online.
<br /><br />
3 - Access to our Discord Community who build fast, build in public and make real money
`
  },
  {
    title: 'Can I get a refund?',
    description:
      `After you've got access to the repo, TurboStack is yours forever, so it can't be refunded. I can assure you that TurboStack users ship startups in 7 days and make their first $ online in record time.
`
  },
  {
    title: 'Can I deploy my app anywhere?',
    description: 'Yes you can, but I highly recommend you to use Vercel as your provider. This will allow you to ship your app at TurboSpeed'
  },
  {
    title: 'How often is TurboStack updated?',
    description: 'We personally use TurboStack for all our business, so, whenever a new feature is shipped to our apps, we bring it to TurboStack.'
  },
]

export function FAQ() {
  return (
    <section className="border-t py-16 md:py-32" id="faq">
      <div className="px-4 sm:px-6 lg:px-8 container w-full mx-auto flex flex-col">
        <h1 className="text-3xl md:text-5xl text-center leading-[1.2] font-medium">
          Frequently Asked Questions
        </h1>
        <div className="mt-8 text-muted-foreground text-center font-normal text-md md:text-lg lg:text-xl flex flex-col">
          <h2>
            <span>
              Have another question? Contact me by <a href="mailto:vitor@turbostack.io" className="font medium underline underline-offset-4">email</a>
            </span>
          </h2>
        </div>
        <Accordion type="multiple" className="mt-16 max-w-4xl mx-auto w-full">
          {questions.map(({ title, description }) => (
            <AccordionItem key={title} value={title} className="py-4">
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                <p className="mt-4 text-muted-foreground" dangerouslySetInnerHTML={{__html: description}} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}