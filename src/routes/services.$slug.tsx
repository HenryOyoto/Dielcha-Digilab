import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { projects, services } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDescription },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = projects.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          image={service.image}
          label={`Service ${service.number}`}
          title={service.title}
          intro={service.short}
          tone={service.number === "01" ? "blue" : service.number === "02" ? "green" : service.number === "03" ? "red" : "blue"}
        >
          {/* Tag labels hidden on the website:
<div className="flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <span
                key={t}
                className="label-mono rounded-md border border-on-image/40 px-2 py-1 text-[0.65rem] text-on-image"
              >
                {t}
              </span>
            ))}
          </div>
*/}
        </PageHero>



        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
              <section>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="mt-3 text-muted-foreground">{service.overview}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Capabilities</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.capabilities.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-card p-3.5 text-sm shadow-card"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Process</h2>
                <ol className="mt-6 flex flex-wrap items-center gap-3">
                  {service.process.map((step, i) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                        {step}
                      </span>
                      {i < service.process.length - 1 && (
                        <span className="text-accent" aria-hidden>
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </section>

              {service.scope && (
                <section className="rounded-lg border-l-4 border-accent bg-muted p-6">
                  <h2 className="text-xl font-bold text-accent">Scope</h2>
                  <p className="mt-2 text-sm">{service.scope}</p>
                </section>
              )}
            </div>

            <aside className="space-y-8">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="text-xl font-bold text-primary">Typical deliverables</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-muted p-6">
                <h2 className="text-xl font-bold text-primary">Who it is for</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {service.audience.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">{service.requirement}</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-border shadow-card">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="size-full object-cover"
                />
              </div>
            </aside>
          </div>

          <section className="mt-20">
            <h2 className="text-2xl font-bold">Related Projects</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <article
                  key={r.slug}
                  className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="section-kicker text-secondary">{r.category}</p>
                    <h3 className="mt-2 font-display text-base font-semibold leading-snug">
                      {r.title}
                    </h3>
                    <Link
                      to="/work/$slug"
                      params={{ slug: r.slug }}
                      className="mt-3 inline-block text-sm font-semibold text-primary hover:text-destructive"
                    >
                      View Project →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="relative isolate overflow-hidden">
          <img
            src={service.image}
            alt=""
            aria-hidden
            loading="lazy"
            width={1600}
            height={1000}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="overlay-soft absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-3xl font-bold text-on-image">{service.ctaLabel}</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/start-a-project"
                search={{ service: service.slug }}
                className="rounded-md bg-destructive px-7 py-3.5 text-sm font-semibold text-destructive-foreground transition-colors hover:brightness-110"
              >
                Start a Project
              </Link>
              <WhatsAppButton />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
