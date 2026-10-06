import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { brand, focusAreas } from "@/data/site";
import bgAbout from "@/assets/bg-about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About DIELCHA DIGILAB" },
      { name: "description", content: "DIELCHA DIGILAB designs and develops electronic hardware, embedded systems, connected devices, engineering designs and supporting software for products, businesses and technical teams." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          image={bgAbout}
          title="Engineering work that can move into the real world"
          intro="Dielcha works across electronic hardware, embedded systems, connected devices, engineering design and technical documentation, helping product teams and businesses turn technical requirements into clear, buildable work."
          tone="green"
        />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              {/* Label hidden on the website: <p className="label-mono text-primary">What We Do</p> */}
              <h2 className="mt-2 text-3xl font-bold">From technical idea to usable product work</h2>
            </div>
            <div className="text-muted-foreground">
              <p>Dielcha brings electronic design, embedded development, engineering design and technical documentation together so a product does not have to be split between unrelated technical work. A PCB can be developed alongside its firmware, a device can be designed with its enclosure in mind, and the documentation can be prepared for the people who will build, test or maintain it.</p>
              <p className="mt-5">Work starts with the actual requirement. That may be a new product, an existing board that needs improvement, a prototype that needs firmware, or a technical design that needs to be prepared for fabrication. Scope, files and expected deliverables are discussed before work begins.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            {/* Label hidden on the website: <p className="label-mono text-secondary">Focus Areas</p> */}
            <h2 className="mt-2 text-3xl font-bold">What Dielcha covers</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {focusAreas.map((x) => (
                <div key={x.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <h3 className="font-display font-semibold">{x.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Have something you need built or improved?</h2>
          <p className="mt-4 text-muted-foreground">{brand.positioning} If the work involves electronics, embedded software, product design, documentation or a connected device, send the details and we can discuss the right scope.</p>
          <Link to="/start-a-project" className="mt-8 inline-block rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-destructive-foreground hover:brightness-110">Start a Project</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
