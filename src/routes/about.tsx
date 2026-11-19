import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { SectionHead } from "@/components/SectionHead";
import { Toolbox } from "@/components/Toolbox";
import { YouTubeBand } from "@/components/YouTubeBand";
import { componentShelves } from "@/data/images";
import { brand, principles } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Dielcha Digilab" },
      { name: "description", content: "Dielcha Digilab designs and builds electronic hardware, embedded systems, connected devices, engineering designs and the software around them for products, businesses and technical teams." },
    ],
  }),
  component: AboutPage,
});

const tones = ["blue", "green", "yellow", "red"] as const;

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        tone="red"
        crumbs={[{ label: "About" }]}
        title="Hello, we are Dielcha Digilab."
        intro="We help people turn ideas into working electronics, connected devices and the clear documents behind them."
      />

      <section className="section">
        <div className="container-x about">
          <div className="about__copy">
            <h2 className="h2">
              Who <span className="mark mark--gold">we are.</span>
            </h2>
            <p className="lead">{brand.name} designs and builds electronic hardware, embedded systems, connected devices, engineering designs and the software that supports them, for products, businesses and technical teams.</p>
            <p>
              Most of the work happens online, using drawings, design files, measurements and photographs. When a project needs real hardware, we put it through proper testing before it reaches you. Have something from another discipline? Send us the details and we will tell you honestly whether we are the right people for it.
            </p>
            <div className="about__actions">
              <Link to="/start-a-project" className="btn btn--primary btn--lg">
                Start a project <ArrowRight className="size-5" />
              </Link>
              <Link to="/work" className="btn btn--ghost btn--lg">
                See our work
              </Link>
            </div>
          </div>
          <figure className="about__photo">
            <span className="about__back" aria-hidden="true" />
            <img src={componentShelves} alt="Shelves of electronic components and test equipment" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container-x">
          <SectionHead
            title={
              <>
                How we like <span className="mark mark--green">to work.</span>
              </>
            }
            text="A few simple promises we try to keep on every project."
          />
          <ul className="values">
            {principles.map((p, i) => (
              <li key={p.title} className={`value tone-${tones[i % 4]}`}>
                <span className="value__dot" aria-hidden="true" />
                <h3 className="value__title">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead center title={<>The tools we <span className="mark mark--blue">rely on.</span></>} text="Familiar, well-supported tools, so your files open on your side too." />
          <div className="section__body">
            <Toolbox />
          </div>
        </div>
      </section>

      <YouTubeBand />
    </PageShell>
  );
}
