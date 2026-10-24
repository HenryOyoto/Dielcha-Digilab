import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { brand } from "@/data/site";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: `Terms of Service | ${brand.name}` },
      { name: "description", content: `Terms of service for ${brand.name}.` },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-9 sm:px-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">
          This website presents the services of DIELCHA DIGILAB. Submitting an enquiry does not
          create a contract; scope, cost and schedule are agreed per project in writing before work
          begins.
        </p>
        <p className="mt-4 text-muted-foreground">
          Physical hardware inspection or testing, where required, is scoped separately, and technical
          findings depend on the information and access available for the project.
        </p>
        <p className="mt-4 text-muted-foreground">
          Prototypes are developed for evaluation and proof of concept, not for production use.
        </p>
        <p className="mt-4 text-muted-foreground">
          Content on this site is the property of DIELCHA DIGILAB and may not be reproduced without
          permission.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
