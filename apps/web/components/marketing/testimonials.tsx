import { Avatar, Card, CardContent, CardFooter } from "@turbostack/ui"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Founder, TechNova",
    content: "This template is a game-changer! We launched our MVP in just 5 days, a process that would have taken months otherwise.",
  },
  {
    name: "Samantha Lee",
    role: "CTO, FinTrack",
    content: "As a technical founder, I was skeptical about using a template. But this one surprised me with its clean code and flexibility. We customized it to fit our fintech needs and got to market in record time. The time saved on boilerplate work was invaluable.",
  },
  {
    name: "Michael Chen",
    role: "CEO, HealthPulse",
    content: "Our healthcare startup needed a secure, scalable solution fast. This template not only met our technical requirements but also helped us pass our security audits quickly. We went from idea to funded startup in just 3 months!",

  },
  {
    name: "Emily Taylor",
    role: "CMO, GrowthBoost",
    content: "The built-in analytics and user management features in this template are fantastic. We were able to understand our users and iterate on our product from day one. It's like having a growth team's toolkit right out of the box.",

  },
  {
    name: "David Rodriguez",
    role: "Founder, EduSpark",
    content: "As a non-technical founder, this template was a lifesaver. The documentation was clear, and I was able to make basic changes myself. For more complex features, the structure made it easy for freelancers to jump in and help. We launched our e-learning platform in record time.",

  },
  {
    name: "Sarah Thompson",
    role: "Product Manager, DataViz",
    content: "The component library in this template is comprehensive and well-designed. We built a complex data visualization tool in half the time we estimated. The responsive design worked flawlessly across devices, saving us countless hours of tweaking.",

  },
  {
    name: "James Wilson",
    role: "CIO, SecureCloud",
    content: "Security was our top priority, and this template didn't disappoint. The built-in authentication system and data encryption features gave us a solid foundation. We customized it for our cloud security startup and passed VC due diligence with flying colors.",

  }
]

export function Testimonials() {
  return (
    <section className="border-t py-24 md:py-32 " id="testimonials">
      <div className="px-4 sm:px-6 lg:px-8 container w-full mx-auto flex flex-col">
        <h1 className="text-3xl md:text-5xl text-center leading-[1.2] font-medium">
          See what our customers says
        </h1>
        <TestimonialsGrid />
      </div>
    </section>
  )
}

function TestimonialsGrid() {
  return (
    <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full ">
      {testimonials.map(testimonial => (
        <Card key={testimonial.name} className="mb-6 break-inside-avoid">
          <CardContent className="p-6">
            <p>{testimonial.content}</p>
            <div className="mt-6 flex space-x-4 items-center">
              <Avatar className="w-16 h-16" fallback={testimonial.name} />
              <div className="flex flex-col">
                <p className="font-semibold">{testimonial.name}</p>
                <span className="text-muted-foreground">{testimonial.role}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}