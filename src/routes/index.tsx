import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TechMarquee, items as toolItems } from "@/components/TechMarquee";
import { ServiceBento } from "@/components/ServiceBento";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ProductAnatomy } from "@/components/ProductAnatomy";
import { Counter } from "@/components/Counter";
import { Avatar } from "@/components/Avatars";
import { Faq } from "@/components/Faq";
import { QuickEnquiry } from "@/components/QuickEnquiry";
import { TraceArt } from "@/components/Art";
import { personas } from "@/data/content";
import { projects, services } from "@/data/site";

const title = "Dielcha Digilab | Engineering Design, Embedded Systems & IoT";
const description = "Dielcha Digilab takes ideas to finished products: electronics and PCB design, embedded systems and IoT, product CAD and technical documentation, based in Juja, Kenya.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: Home,
});

const stats = [
  { n: projects.length, label: "Projects" },
  { n: toolItems.length, label: "Tools" },
  { n: services.length, label: "Services" },
];

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSlider />
        <TechMarquee />

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="display-title">What we <span className="grad-text">build.</span></h2>
            <Link to="/services" className="text-sm font-bold text-[#12344f] hover:text-[var(--brand-red)]">All services →</Link>
          </div>
          <div className="mt-5"><ServiceBento /></div>
        </section>

        <section className="blueprint border-y border-border">
          <div className="mx-auto max-w-7xl px-4 section sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
              <div>
                <h2 className="display-title">One product, <span className="grad-text">four disciplines.</span></h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">A connected device is more than a circuit board. Explore which part of the build each service covers.</p>
                <dl className="mt-4 grid max-w-xs grid-cols-3 gap-2 text-center">
                  {stats.map((s) => (
                    <div key={s.label} className="card-s px-2 py-2.5">
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-2xl font-extrabold text-[var(--brand-blue)]"><Counter value={s.n} /></dd>
                      <p className="text-[0.7rem] font-semibold text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </dl>
              </div>
              <ProductAnatomy />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 section sm:px-6"><ProcessSteps /></section>

        <section className="bg-[var(--paper)] border-y border-border">
          <div className="mx-auto max-w-7xl px-4 section sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="display-title">Selected <span className="grad-text">projects.</span></h2>
              <Link to="/work" className="text-sm font-bold text-[#12344f] hover:text-[var(--brand-red)]">All projects →</Link>
            </div>
            <div className="mt-5"><ProjectShowcase items={projects.slice(0, 6)} /></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <h2 className="display-title">Who we <span className="grad-text">help.</span></h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map((p) => (
              <Link key={p.title} to="/services/$slug" params={{ slug: p.service }} className="persona">
                <Avatar kind={p.avatar} size={52} label={p.title} />
                <span className="min-w-0">
                  <span className="block font-display text-[0.98rem] font-extrabold leading-tight text-[#12344f]">{p.title}</span>
                  <span className="mt-1 block text-[0.82rem] leading-5 text-muted-foreground">{p.need}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[var(--paper)] border-y border-border">
          <div className="mx-auto max-w-7xl px-4 section sm:px-6">
            <h2 className="display-title">Quick <span className="grad-text">answers.</span></h2>
            <div className="mt-5"><Faq /></div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[var(--navy)] text-white">
          <TraceArt className="pagehead__art" />
          <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Have a Product or Project?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/75 md:text-base">An early idea, a sketch or existing files are enough. Tell us in one line and we will take it from there.</p>
            <div className="mt-6"><QuickEnquiry /></div>
            <Link to="/start-a-project" className="mt-4 inline-block text-sm font-bold text-[var(--brand-yellow)] hover:text-white">Prefer a detailed brief? Start a project →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
