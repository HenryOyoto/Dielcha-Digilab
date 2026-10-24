import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, githubLink } from "@/data/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { ReadingProgress } from "@/components/ReadingProgress";

export const Route = createFileRoute("/lab_/articles/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Technical Note"} | Dielcha Digilab` }, { name: "description", content: loaderData?.summary ?? "" }] }),
  component: ArticlePage,
});

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function ArticlePage() {
  const article = Route.useLoaderData();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgress />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          tone="green" crumbs={[{ label: "Lab", to: "/lab" }, { label: article.category }]}
          title={article.title} intro={article.summary}
          aside={<img src={article.image} alt="" aria-hidden="true" decoding="async" className="hidden h-28 w-44 rounded-xl border border-white/20 object-cover shadow-lift md:block" />}
        />
        <section className="mx-auto max-w-5xl px-4 section sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <nav className="toc hidden lg:sticky lg:top-20 lg:block lg:self-start" aria-label="On this page">
              <p className="mb-1.5 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">On this page</p>
              {article.sections.map((s) => <a key={s.heading} href={`#${slugify(s.heading)}`}>{s.heading}</a>)}
            </nav>
            <article className="prose-s min-w-0">
              <p className="rounded-xl bg-[var(--paper)] px-4 py-3 text-[0.95rem] leading-7 text-[#2b3948]">{article.introduction}</p>
              {article.sections.map((s) => (
                <div key={s.heading}>
                  <h2 id={slugify(s.heading)}>{s.heading}</h2>
                  <p>{s.text}</p>
                </div>
              ))}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3">
                <p className="m-0 text-sm font-semibold text-[#12344f]">More engineering work on GitHub</p>
                <a href={githubLink} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--brand-blue)] px-4 py-1.5 text-sm font-bold text-white hover:bg-[var(--brand-red)]">Open GitHub</a>
              </div>
            </article>
          </div>

          <div className="mt-8 border-t border-border pt-5">
            <h2 className="font-display text-base font-extrabold text-[#12344f]">More notes</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {more.map((a) => (
                <Link key={a.slug} to="/lab/articles/$slug" params={{ slug: a.slug }} className="card-s p-3 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="chip chip--blue">{a.category}</span>
                  <p className="mt-1.5 font-display text-[0.95rem] font-extrabold leading-tight text-[#12344f]">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
