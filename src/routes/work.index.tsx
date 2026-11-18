import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SectionHead } from "@/components/SectionHead";
import { GitHubGlyph } from "@/components/SocialIcons";
import { githubLink, githubProjects, projects } from "@/data/site";

const tones = ["blue", "green", "yellow", "red"] as const;

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Projects - Dielcha Digilab" },
      { name: "description", content: "Selected PCB design, embedded systems and IoT projects from Dielcha Digilab, with more work on GitHub." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <PageShell>
      <PageHero
        tone="blue"
        crumbs={[{ label: "Projects" }]}
        title="Things we have built."
        intro="Three case studies in detail, and plenty more on GitHub. Every one started as somebody's idea."
      />

      <section className="section">
        <div className="container-x">
          <ProjectShowcase items={projects} />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container-x">
          <SectionHead
            title={
              <>
                Even more, <span className="mark mark--green">on GitHub.</span>
              </>
            }
            text="Open projects you can read, run and learn from."
            action={
              <a href={githubLink} target="_blank" rel="noreferrer" className="btn btn--ghost">
                <GitHubGlyph className="size-5" /> View all on GitHub
              </a>
            }
          />
          <ul className="repo-grid">
            {githubProjects.map((p, i) => (
              <li key={p.slug}>
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className={`repo tone-${tones[i % 4]}`}>
                  <span className="repo__cat">{p.category}</span>
                  <span className="repo__title">{p.title}</span>
                  <span className="repo__text">{p.summary}</span>
                  <span className="repo__more">
                    <GitHubGlyph className="size-4" /> Open on GitHub
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x cta-strip">
          <h2 className="h2">Got something <span className="mark mark--gold">like this in mind?</span></h2>
          <p className="lead">Tell us about it. We would love to hear what you are building.</p>
          <Link to="/start-a-project" className="btn btn--primary btn--lg">
            Start a project <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
