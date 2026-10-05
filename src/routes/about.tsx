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
      { name: "description", content: "DIELCHA DIGILAB is a modern engineering and digital product studio working across electronic hardware, embedded systems, IoT, engineering design and technical documentation." },
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
          title="A modern engineering and digital product studio"
          intro="DIELCHA DIGILAB works across electronic hardware, embedded systems, IoT, engineering design and technical documentation, taking a project from requirements to a clear, buildable design."
          tone="green"
        />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              {/* Label hidden on the website: <p className="label-mono text-primary">What We Do</p> */}
              <h2 className="mt-2 text-3xl font-bold">Engineering, built to be used</h2>
            </div>
            <div className="text-muted-foreground">
              <p>DIELCHA DIGILAB brings electronic design, embedded development, engineering design and technical documentation together under one workflow, so a project moves cleanly from requirements to a finished, buildable design.</p>
              <p className="mt-5">Every engagement follows the same structured process: requirements, review, agreement, design and delivery, so scope, deliverables and timelines stay clear from the start.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            {/* Label hidden on the website: <p className="label-mono text-secondary">Focus Areas</p> */}
            <h2 className="mt-2 text-3xl font-bold">What the studio covers</h2>
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
          <h2 className="text-3xl font-bold">Work with DIELCHA DIGILAB</h2>
          <p className="mt-4 text-muted-foreground">{brand.positioning}</p>
          <Link to="/start-a-project" className="mt-8 inline-block rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-destructive-foreground hover:brightness-110">Start a Project</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
