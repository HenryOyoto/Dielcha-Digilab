import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { GitHubGlyph } from "@/components/SocialIcons";
import { articles, githubLink } from "@/data/site";

export const Route = createFileRoute("/lab_/articles/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Technical Note"} - Dielcha Digilab` }, { name: "description", content: loaderData?.summary ?? "" }],
  }),
  component: ArticlePage,
});

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function ArticlePage() {
  const article = Route.useLoaderData();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <PageShell>
      <PageHero
        tone="blue"
        crumbs={[{ label: "Lab", to: "/lab" }, { label: article.category }]}
        title={article.title}
        intro={article.summary}
        aside={<img src={article.image} alt="" aria-hidden="true" decoding="async" className="pagehead__photo pagehead__photo--wide" />}
      />

      <section className="section">
        <div className="container-x reading">
          <nav className="toc" aria-label="On this page">
            <p>On this page</p>
            {article.sections.map((s) => (
              <a key={s.heading} href={`#${slugify(s.heading)}`}>{s.heading}</a>
            ))}
          </nav>
          <article className="prose">
            <p className="prose__intro">{article.introduction}</p>
            {article.sections.map((s) => (
              <div key={s.heading}>
                <h2 id={slugify(s.heading)}>{s.heading}</h2>
                <p>{s.text}</p>
              </div>
            ))}
            <div className="prose__cta">
              <p>More engineering work on GitHub</p>
              <a href={githubLink} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
                <GitHubGlyph className="size-4" /> Open GitHub
              </a>
            </div>
          </article>
        </div>

        <div className="container-x more">
          <h2 className="h3">More notes</h2>
          <div className="more__grid">
            {more.map((a) => (
              <Link key={a.slug} to="/lab/articles/$slug" params={{ slug: a.slug }} className="more__card">
                <span className="chip chip--blue">{a.category}</span>
                <strong>{a.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
