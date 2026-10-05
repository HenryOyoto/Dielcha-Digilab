import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { resources } from "@/data/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/lab_/resources/$slug")({
  loader: ({ params }) => {
    const resource = resources.find((item) => item.slug === params.slug);
    if (!resource) throw notFound();
    return resource;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Engineering Resource"} | DIELCHA LAB` },
      { name: "description", content: loaderData?.description ?? "An engineering reference from DIELCHA LAB." },
    ],
  }),
  component: ResourcePage,
});

function ResourcePage() {
  const resource = Route.useLoaderData();
  const related = resources.filter((item) => item.slug !== resource.slug).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/lab" className="font-semibold hover:text-primary">Lab</Link><span aria-hidden="true">/</span><span className="text-foreground">{resource.title}</span>
            </nav>
            <div className="mt-7 max-w-4xl">
              <p className="label-mono text-secondary">{resource.format} · Engineering Resource</p>
              <h1 className="mt-3 text-4xl font-bold text-primary md:text-5xl">{resource.title}</h1>
              <p className="mt-5 text-lg leading-8 text-foreground">{resource.description}</p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="lab-detail-grid">
            <article className="lab-reading min-w-0">
              <section className="engineering-card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">{resource.fileLabel}</h2>
                    <p className="mt-2 text-sm text-foreground">Free to download and intended to support a structured engineering review.</p>
                  </div>
                  <a href={resource.downloadUrl} target="_blank" rel="noreferrer" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-destructive">
                    {resource.downloadLabel}
                  </a>
                </div>

                <h2 className="mt-8 text-2xl font-bold text-primary">Overview</h2>
                <p className="mt-4">{resource.detail}</p>
                <p className="mt-4">Work through the resource in order, mark each item against the actual design or documentation, and record exceptions that need an engineer's attention. The goal is not simply to tick boxes; it is to make important assumptions visible before they become expensive problems.</p>

                <h2 className="mt-10 text-2xl font-bold text-secondary">What it covers</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {resource.points.map((point, index) => (
                    <div key={point} className={`rounded-xl border border-border p-5 ${index % 2 === 0 ? "border-t-4 border-t-primary" : "border-t-4 border-t-secondary"}`}>
                      <h3 className="font-display font-semibold text-primary">{point}</h3>
                      <p className="mt-3 text-sm leading-7 text-foreground">Review this area against the actual project evidence. Confirm the requirement, identify any mismatch or missing information, and record the action needed before the design moves to procurement, fabrication, assembly or release.</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-xl border-l-4 border-l-destructive bg-white p-5 shadow-card">
                  <h2 className="text-xl font-bold text-destructive">DIELCHA Note</h2>
                  <p className="mt-2 text-sm leading-7 text-foreground">Use this as a working reference alongside your own design review process. It supports engineering judgement; it does not replace a full manufacturing, safety or compliance sign-off where one is required.</p>
                </div>
              </section>
            </article>
          </div>

          {related.length > 0 && (
            <section className="mt-14">
              <p className="label-mono text-destructive">Continue the review</p>
              <h2 className="mt-2 text-2xl font-bold text-primary">Related Resources</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map((item, index) => (
                  <Link key={item.slug} to="/lab/resources/$slug" params={{ slug: item.slug }} className="engineering-card group p-5 hover:-translate-y-1">
                    <span className={`label-mono ${index === 1 ? "text-secondary" : index === 2 ? "text-destructive" : "text-primary"}`}>{item.format}</span>
                    <p className="mt-3 font-display font-semibold text-primary group-hover:text-destructive">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-14 rounded-2xl bg-primary p-8 text-center text-primary-foreground shadow-lift sm:p-10">
            <h2 className="text-2xl font-bold">Need help applying the checklist?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7">Share your requirements, design files, drawings or photographs and DIELCHA DIGILAB can help define the right engineering review or development scope.</p>
            <Link to="/start-a-project" className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary hover:text-destructive">Start a Project</Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
