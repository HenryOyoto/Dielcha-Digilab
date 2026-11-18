import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ProjectGallery } from "@/components/ProjectShowcase";
import { WhatsAppLink } from "@/components/ContactLinks";
import { GitHubGlyph, WhatsAppGlyph } from "@/components/SocialIcons";
import { findTool } from "@/data/tools";
import { projects } from "@/data/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Project"} - Dielcha Digilab` }, { name: "description", content: loaderData?.summary ?? "" }],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const p = Route.useLoaderData();
  const at = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(at - 1 + projects.length) % projects.length];
  const next = projects[(at + 1) % projects.length];

  return (
    <PageShell>
      <PageHero tone="blue" image={p.hero} crumbs={[{ label: "Projects", to: "/work" }, { label: p.category }]} title={p.title} intro={p.summary}>
        <div className="pagehead__row">
          <span className="tag-gold">{p.category}</span>
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn--white btn--sm">
              <GitHubGlyph className="size-4" /> View on GitHub
            </a>
          )}
        </div>
      </PageHero>

      <section className="section">
        <div className="container-x detail tone-blue">
          <div className="detail__main">
            <ProjectGallery project={p} />

            <div className="card card--two">
              <div>
                <h2 className="card__title card__title--sm">Overview</h2>
                <p className="card__text">{p.overview}</p>
              </div>
              <div>
                <h2 className="card__title card__title--sm">Objective</h2>
                <p className="card__text">{p.objective}</p>
              </div>
            </div>

            <div className="card">
              <h2 className="card__title">Design approach</h2>
              <ol className="flow flow--list">
                {p.designApproach.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>

            <div className="card">
              <h2 className="card__title">Key decisions</h2>
              <ul className="checks checks--two">
                {p.decisions.map((d) => (
                  <li key={d}><Check className="size-4" aria-hidden="true" />{d}</li>
                ))}
              </ul>
            </div>

            {p.notes.length > 0 && (
              <div className="note note--gold">
                {p.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            )}
          </div>

          <aside className="detail__aside">
            <div className="card">
              <h2 className="card__title card__title--sm">Technologies</h2>
              <ul className="tlist">
                {p.technologies.map((t) => {
                  const known = findTool(t);
                  return (
                    <li key={t} className={known ? "tchip" : "chip"}>
                      {known && <img src={known.logo} alt="" width={28} height={28} loading="lazy" />}
                      <span>{t}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="card">
              <h2 className="card__title card__title--sm">Deliverables</h2>
              <ul className="checks">
                {p.deliverables.map((d) => (
                  <li key={d}><Check className="size-4" aria-hidden="true" />{d}</li>
                ))}
              </ul>
            </div>
            <div className="cta-card">
              <p className="cta-card__title">Need something similar?</p>
              <p className="cta-card__text">Send your requirements and we will scope it with you.</p>
              <Link to="/start-a-project" search={{ service: p.category }} className="btn btn--gold">
                Start a project <ArrowRight className="size-4" />
              </Link>
              <WhatsAppLink className="btn btn--wa">
                <WhatsAppGlyph className="size-5" /> Chat on WhatsApp
              </WhatsAppLink>
            </div>
          </aside>
        </div>

        <nav className="container-x pager" aria-label="More projects">
          <Link to="/work/$slug" params={{ slug: prev.slug }} className="pager__item">
            <span>Previous</span>
            <strong>{prev.title}</strong>
          </Link>
          <Link to="/work/$slug" params={{ slug: next.slug }} className="pager__item pager__item--next">
            <span>Next</span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      </section>
    </PageShell>
  );
}
