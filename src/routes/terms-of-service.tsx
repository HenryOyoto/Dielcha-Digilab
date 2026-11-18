import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { brand } from "@/data/site";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: `Terms of Service - ${brand.name}` },
      { name: "description", content: `Terms of service for ${brand.name}.` },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <PageHero tone="yellow" title="Terms of Service" intro="How we work together, in plain words." />
      <section className="section">
        <div className="container-x legal">
          <p>
            This website presents the services of {brand.name}. Sending an enquiry does not create a contract. Scope, cost and schedule are agreed for each project, in writing, before work begins.
          </p>
          <p>Physical hardware inspection or testing, where it is needed, is scoped separately, and technical findings depend on the information and access available for the project.</p>
          <p>Prototypes are developed for evaluation and proof of concept, not for production use.</p>
          <p>Content on this site belongs to {brand.name} and may not be reproduced without permission.</p>
        </div>
      </section>
    </PageShell>
  );
}
