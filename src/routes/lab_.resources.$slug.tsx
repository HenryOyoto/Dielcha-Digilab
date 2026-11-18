import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Download } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { resources } from "@/data/site";

export const Route = createFileRoute("/lab_/resources/$slug")({
  loader: ({ params }) => {
    const resource = resources.find((item) => item.slug === params.slug);
    if (!resource) throw notFound();
    return resource;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Resource"} - Dielcha Digilab` },
      { name: "description", content: loaderData?.description ?? "A reference from Dielcha Digilab." },
    ],
  }),
  component: ResourcePage,
});

function ResourcePage() {
  const resource = Route.useLoaderData();
  const [done, setDone] = useState<Set<string>>(new Set());
  const toggle = (p: string) =>
    setDone((prev) => {
      const n = new Set(prev);
      if (n.has(p)) n.delete(p);
      else n.add(p);
      return n;
    });
  const pct = Math.round((done.size / resource.points.length) * 100);
  const others = resources.filter((r) => r.slug !== resource.slug);

  return (
    <PageShell>
      <PageHero tone="green" crumbs={[{ label: "Lab", to: "/lab" }, { label: resource.format }]} title={resource.title} intro={resource.description} />

      <section className="section">
        <div className="container-x detail tone-green">
          <div className="detail__main">
            <div className="card">
              <h2 className="card__title">About this resource</h2>
              <p className="card__text">{resource.detail}</p>
            </div>

            <div className="card">
              <div className="card__row">
                <h2 className="card__title">Try it: tick what you have covered</h2>
                <span className="count">{done.size}/{resource.points.length}</span>
              </div>
              <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Checklist progress">
                <span style={{ width: `${pct}%` }} />
              </div>
              <div className="check-list">
                {resource.points.map((p) => (
                  <button key={p} type="button" role="checkbox" aria-checked={done.has(p)} className="check-row" onClick={() => toggle(p)}>
                    <span className="check-box" aria-hidden="true">
                      <Check className="size-4" />
                    </span>
                    {p}
                  </button>
                ))}
              </div>
              {pct === 100 && (
                <p className="note note--green" role="status">
                  Everything covered. Download the full {resource.format} to keep it.
                </p>
              )}
            </div>
          </div>

          <aside className="detail__aside">
            <div className="card card--media">
              <img src={resource.image} alt="" aria-hidden="true" decoding="async" />
              <div className="card--media__body">
                <span className="chip chip--tone">{resource.fileLabel}</span>
                <a href={resource.downloadUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
                  <Download className="size-4" /> {resource.downloadLabel}
                </a>
              </div>
            </div>
            <div className="card">
              <h2 className="card__title card__title--sm">More from the lab</h2>
              <ul className="rowlist">
                {others.slice(0, 3).map((o) => (
                  <li key={o.slug}>
                    <Link to="/lab/resources/$slug" params={{ slug: o.slug }} className="rowlist__item">
                      <span>{o.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
