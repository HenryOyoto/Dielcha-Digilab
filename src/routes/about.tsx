import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { brand } from "@/data/site";
import aboutPhoto from "@/assets/bg-about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Dielcha Digilab" },
      { name: "description", content: "Dielcha Digilab designs and develops electronic hardware, embedded systems, connected devices, engineering designs and supporting software for products, businesses and technical teams." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="red" crumbs={[{ label: "About" }]} title="About" intro="PCB design, embedded systems, product CAD and documentation from a small lab in Juja, Kenya." />

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <div className="min-w-0">
              <h2 className="section-title">Who we are</h2>
              <p className="mt-3 text-[0.95rem] leading-7 text-[#3a4654]">{brand.name} designs and develops electronic hardware, embedded systems, connected devices, engineering designs and supporting software for products, businesses and technical teams.</p>
              <p className="mt-2.5 text-[0.95rem] leading-7 text-[#3a4654]">Work is handled remotely wherever possible, using drawings, design files, measurements and photographs, with physical testing where it is needed. Projects from other disciplines are welcome too: send the details and we will say honestly whether we are the right fit.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/start-a-project" className="btn btn--primary">Start a project</Link>
                <WhatsAppButton className="rounded-full" />
              </div>
            </div>
            <img src={aboutPhoto} alt="A workshop shelved with electronic components and test equipment" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lift md:aspect-[4/3]" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
