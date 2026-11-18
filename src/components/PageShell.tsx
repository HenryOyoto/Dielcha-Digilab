import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

/** Header, main content and footer, shared by every page. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <SiteHeader />
      <main className="page__main">{children}</main>
      <SiteFooter />
    </div>
  );
}
