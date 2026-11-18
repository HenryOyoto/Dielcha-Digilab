import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactCards } from "@/components/ContactCards";
import { HeroSlider } from "@/components/HeroSlider";
import { OrbitArt } from "@/components/OrbitArt";
import { PageShell } from "@/components/PageShell";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SectionHead } from "@/components/SectionHead";
import { ServiceCards } from "@/components/ServiceCards";
import { Toolbox } from "@/components/Toolbox";
import { YouTubeBand } from "@/components/YouTubeBand";
import { githubLink, projects, workflowSteps } from "@/data/site";

const title = "Dielcha Digilab - Product Design, Embedded Systems & IoT";
const description =
  "Got an idea? Dielcha Digilab helps you turn it into something real: PCB design, embedded systems and IoT, product CAD and clear technical documentation, delivered online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <HeroSlider />

      <section className="section">
        <div className="container-x">
          <SectionHead
            title={
              <>
                How we can <span className="mark mark--blue">help you build.</span>
              </>
            }
            text="Four ways we work with people who have an idea and want it done properly."
            action={
              <Link to="/services" className="btn btn--ghost">
                All services <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="section__body">
            <ServiceCards />
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container-x">
          <SectionHead
            title={
              <>
                Work we are <span className="mark mark--gold">proud of.</span>
              </>
            }
            text="A few projects, from the first circuit to the finished board."
            action={
              <a href={githubLink} target="_blank" rel="noreferrer" className="btn btn--ghost">
                More on GitHub <ArrowRight className="size-4" />
              </a>
            }
          />
          <div className="section__body">
            <ProjectShowcase items={projects} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead
            center
            title={
              <>
                The tools in <span className="mark mark--green">our toolbox.</span>
              </>
            }
            text="Familiar, well-supported tools, so your files open on your side too."
          />
          <div className="section__body">
            <Toolbox />
          </div>
        </div>
      </section>

      <section className="section section--tint how">
        <div className="container-x">
          <SectionHead
            title={
              <>
                Here is how it <span className="mark mark--gold">goes.</span>
              </>
            }
            text="Simple, clear and friendly, from the first message to the final files."
          />
          <ol className="steps">
            {workflowSteps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__num">{i + 1}</span>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <YouTubeBand id="learn" />

      <section className="section" id="contact">
        <div className="container-x">
          <div className="cpanel">
            <OrbitArt className="cpanel__orbit" dot={false} light />
            <div className="cpanel__copy">
              <h2 className="h2 cpanel__title">Let&rsquo;s talk about your idea.</h2>
              <p className="cpanel__text">
                Pick whichever way suits you. A message, a sketch or a few rough notes is plenty to begin with. We read everything and reply personally.
              </p>
              <Link to="/start-a-project" className="btn btn--gold btn--lg">
                Start a project <ArrowRight className="size-5" />
              </Link>
            </div>
            <ContactCards onDark />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
