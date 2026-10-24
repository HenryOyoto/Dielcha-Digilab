import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Avatar } from "@/components/Avatars";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { brand } from "@/data/site";
import aboutPhoto from "@/assets/bg-about.jpg";
import logo from "@/assets/logo-icon.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Dielcha Digilab" },
      { name: "description", content: "Dielcha Digilab designs and develops electronic hardware, embedded systems, connected devices, engineering designs and supporting software for products, businesses and technical teams." },
    ],
  }),
  component: AboutPage,
});

function Link2() {
  return (
    <svg viewBox="0 0 60 12" className="h-3 w-12 shrink-0 sm:w-20" aria-hidden="true"><path className="anat-edge" d="M0 6 H54" /><path d="m50 1 6 5-6 5" fill="none" stroke="#9db3c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="red" crumbs={[{ label: "About" }]} title="Ideas that move into the real world" intro="Hardware, firmware, connected devices, product design and documentation, from one small lab in Juja, Kenya." />

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <div className="min-w-0">
              <h2 className="display-title">Who we <span className="grad-text">are.</span></h2>
              <p className="mt-3 text-[0.95rem] leading-7 text-[#3a4654]">{brand.name} designs and develops electronic hardware, embedded systems, connected devices, engineering designs and supporting software for products, businesses and technical teams.</p>
              <p className="mt-2.5 text-[0.95rem] leading-7 text-[#3a4654]">Work is handled remotely wherever possible, using drawings, design files, measurements and photographs, with physical testing where it is needed. Projects from other disciplines are welcome too: send the details and we will say honestly whether we are the right fit.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/start-a-project" className="rounded-full bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--brand-red)]">Start a project</Link>
                <WhatsAppButton className="rounded-full" />
              </div>
            </div>
            <img src={aboutPhoto} alt="A workshop shelved with electronic components and test equipment" loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lift md:aspect-[4/3]" />
          </div>
        </section>

        <section className="blueprint border-y border-border">
          <div className="mx-auto max-w-4xl px-4 section sm:px-6">
            <h2 className="text-center font-display text-xl font-extrabold text-[#12344f]">How remote work flows</h2>
            <div className="card-s mt-4 flex items-start justify-between gap-1.5 p-4 text-center text-xs font-bold text-[#12344f] sm:gap-3 sm:p-6 sm:text-sm">
              <div className="min-w-0"><div className="mx-auto w-fit"><Avatar kind="founder" size={60} label="You" /></div><p className="mt-2">You share requirements</p></div>
              <div className="mt-6"><Link2 /></div>
              <div className="min-w-0"><img src={logo} alt="" aria-hidden="true" width={512} height={512} className="mx-auto h-[60px] w-auto rounded-xl bg-white object-contain p-1 shadow-card" /><p className="mt-2">We design and review</p></div>
              <div className="mt-6"><Link2 /></div>
              <div className="min-w-0">
                <svg viewBox="0 0 64 64" width="60" height="60" className="mx-auto" aria-hidden="true"><rect x="12" y="6" width="38" height="50" rx="5" fill="#fff" stroke="#9db3c8" strokeWidth="2" /><rect x="12" y="6" width="38" height="11" rx="5" fill="var(--brand-green)" /><path d="M20 30 H44 M20 38 H44 M20 46 H36" stroke="#9db3c8" strokeWidth="2.200" strokeLinecap="round" /></svg>
                <p className="mt-2">You receive files</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
