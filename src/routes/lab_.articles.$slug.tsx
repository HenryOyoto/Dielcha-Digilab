import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, githubLink } from "@/data/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/lab_/articles/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Technical Note"} | DIELCHA LAB` }] }),
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <Link to="/lab" className="text-sm font-semibold text-primary hover:text-destructive">← Back to Lab</Link>
            <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <p className="section-kicker text-secondary">{article.category} · Technical Note</p>
                <h1 className="mt-3 text-4xl font-bold text-primary md:text-5xl">{article.title}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground">{article.summary}</p>
              </div>
              <img src={article.image} alt="" aria-hidden className="aspect-[16/9] w-full rounded-2xl object-cover shadow-card" />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="lab-detail-grid">
            <article className="lab-reading min-w-0">
              <section className="engineering-card p-6 sm:p-8">
                <h2 className="mt-2 text-2xl font-bold text-primary">What this note is explaining</h2>
                <p className="mt-4">{article.introduction}</p>
                <p className="mt-4">The aim is to turn a broad engineering topic into practical decisions: what to inspect first, what can go wrong, and what should be documented before a design moves to the next stage.</p>
              </section>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {article.sections.map((section) => (
                  <section key={section.heading} className="lab-section-card">
                    <h2 className="text-xl font-bold">{section.heading}</h2>
                    <p className="mt-3">{section.text}</p>
                  </section>
                ))}
              </div>
            </article>

            <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <section className="engineering-card p-6">
                <h2 className="text-xl font-bold text-primary">Apply the note during review</h2>
                <p className="mt-3 text-sm leading-7 text-foreground">Use the sections as a working review sequence. Compare the guidance with the actual schematic, layout, measurements or prototype, then record decisions rather than relying on memory.</p>
              </section>
              <section className="engineering-card p-6">
                <h2 className="text-xl font-bold text-secondary">Document what you find</h2>
                <p className="mt-3 text-sm leading-7 text-foreground">A good engineering note is most useful when it leads to an observable action: a changed component, a checked dimension, a measured value, a revised routing decision or a documented manufacturing constraint.</p>
              </section>
              <section className="rounded-xl border border-border bg-primary p-6 text-primary-foreground shadow-card md:col-span-2 xl:col-span-1">
                <h2 className="text-xl font-bold text-white">More technical material</h2>
                <p className="mt-3 text-sm leading-6">Additional examples, diagrams and project documentation can be followed through the Dielcha GitHub repository.</p>
                <a href={githubLink} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:text-destructive">View on GitHub</a>
              </section>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
