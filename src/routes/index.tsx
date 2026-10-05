import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceAccordion } from "@/components/ServiceAccordion";
import { EngineeringWorkflow } from "@/components/EngineeringWorkflow";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { TechBadges } from "@/components/TechBadges";
import { projects } from "@/data/site";
import bgStart from "@/assets/bg-start.jpg";

const title = "DIELCHA DIGILAB | Engineering & Digital Product Development";
const description = "DIELCHA DIGILAB is a modern engineering and digital product studio working across electronic hardware, embedded systems, IoT, engineering design and technical documentation.";

const whyDielcha = [
  { title: "Direct Engineering Communication", text: "You work directly on the engineering problem, with clear questions and clear answers at every stage.", color: "bg-primary text-primary-foreground" },
  { title: "Organized Deliverables", text: "Schematics, layouts, firmware, models and documentation are handed over in a clean, usable form.", color: "bg-secondary text-secondary-foreground" },
  { title: "Practical, Buildable Designs", text: "Designs are evaluated against real manufacturing, sourcing and assembly constraints, not just simulation.", color: "bg-destructive text-destructive-foreground" },
  { title: "Structured Process", text: "A consistent path from requirements to delivery keeps scope, cost and timeline clear from the start.", color: "bg-primary text-primary-foreground" },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSlider />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Four focused engineering services</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">Hardware, embedded systems, engineering design and technical documentation across the product-development workflow.</p>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary hover:text-destructive">All Services →</Link>
          </div>
          <div className="mt-8"><ServiceAccordion initial={null} /></div>
        </section>

        <section className="border-y border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <EngineeringWorkflow />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Selected Work</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">A focused selection of PCB, embedded and engineering design projects.</p>
            </div>
            <Link to="/work" className="text-sm font-semibold text-primary hover:text-destructive">View All Projects →</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <article key={p.slug} className="group overflow-hidden rounded-lg border border-border bg-card shadow-card hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden"><img src={p.image} alt={p.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="p-5">
                  <h3 className="font-display font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                  <Link to="/work/$slug" params={{ slug: p.slug }} className="mt-4 inline-block text-sm font-semibold text-primary hover:text-destructive">View Project →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Tools &amp; Technologies</h2>
          <TechBadges />
        </section>

        <section className="border-y border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Why DIELCHA DIGILAB</h2>
              <p className="mt-3 text-muted-foreground">What you can expect when you bring an engineering project to us.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyDielcha.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <span className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-bold ${item.color}`}>•</span>
                  <h3 className="mt-4 font-display font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden">
          <img src={bgStart} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
          <div className="overlay-soft absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-3xl font-bold text-on-image md:text-4xl">Have an Engineering Project?</h2>
            <p className="mx-auto mt-4 max-w-xl text-on-image-muted">Share the requirements, drawings, files or photographs and we can define the appropriate engineering scope.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/start-a-project" className="rounded-md bg-destructive px-7 py-3.5 text-sm font-semibold text-destructive-foreground hover:brightness-110">Start a Project</Link>
              <WhatsAppButton />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
