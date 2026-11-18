import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { SectionHead } from "@/components/SectionHead";
import { YouTubeBand } from "@/components/YouTubeBand";
import { articles, resources } from "@/data/site";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab - Dielcha Digilab" },
      { name: "description", content: "Checklists, worksheets, technical notes and YouTube tutorials from Dielcha Digilab." },
    ],
  }),
  component: LabPage,
});

const noteCategories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

function LabPage() {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? articles : articles.filter((a) => a.category === cat);

  return (
    <PageShell>
      <PageHero
        tone="green"
        crumbs={[{ label: "Lab" }]}
        title="Learn with the Lab."
        intro="Practical checklists, worksheets, notes and video tutorials on PCB design, hardware and embedded development. Take what is useful."
      />

      <YouTubeBand />

      <section className="section">
        <div className="container-x">
          <SectionHead
            title={
              <>
                Checklists &amp; <span className="mark mark--blue">worksheets.</span>
              </>
            }
            text="Short, practical references you can use on your next board."
          />
          <div className="section__body lab-grid">
            {resources.map((r) => (
              <Link key={r.slug} to="/lab/resources/$slug" params={{ slug: r.slug }} className={`lab-card ${r.format === "PDF" ? "tone-red" : "tone-green"}`}>
                <img src={r.image} alt="" loading="lazy" decoding="async" className="lab-card__img" />
                <span className="lab-card__body">
                  <span className="chip chip--tone">{r.format}</span>
                  <span className="lab-card__title">{r.title}</span>
                  <span className="lab-card__text">{r.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container-x">
          <SectionHead
            title={
              <>
                Technical <span className="mark mark--gold">notes.</span>
              </>
            }
            action={
              <div className="pfilters" role="group" aria-label="Filter notes">
                {noteCategories.map((c) => (
                  <button key={c} type="button" className="pfilter" aria-pressed={cat === c} onClick={() => setCat(c)}>
                    {c}
                  </button>
                ))}
              </div>
            }
          />
          <div className="section__body lab-grid">
            {shown.map((a) => (
              <Link key={a.slug} to="/lab/articles/$slug" params={{ slug: a.slug }} className="lab-card tone-blue">
                <img src={a.image} alt="" loading="lazy" decoding="async" className="lab-card__img" />
                <span className="lab-card__body">
                  <span className="chip chip--tone">{a.category}</span>
                  <span className="lab-card__title">{a.title}</span>
                  <span className="lab-card__text">{a.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
