import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SearchPalette } from "@/components/SearchPalette";

function NotFoundComponent() {
  return (
    <div className="state">
      <div className="state__box">
        <p className="state__code">404</p>
        <h1 className="h2">We could not find that page.</h1>
        <p className="lead">It may have moved, or the link might be a little off. Let us get you back on track.</p>
        <Link to="/" className="btn btn--primary btn--lg">
          Go to the home page
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="state">
      <div className="state__box">
        <h1 className="h2">This page did not load.</h1>
        <p className="lead">Something went wrong on our side. You can try again, or head back to the home page.</p>
        <div className="state__actions">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn--primary btn--lg"
          >
            Try again
          </button>
          <a href="/" className="btn btn--ghost btn--lg">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Dielcha Digilab - Electronics, Embedded Systems & Engineering Design" },
      {
        name: "description",
        content:
          "Dielcha Digilab designs and builds electronic hardware, embedded systems, connected devices, engineering designs and the software around them for products, businesses and technical teams.",
      },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:site_name", content: "DIELCHA DIGILAB" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://dielchadigilab.netlify.app/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Figtree:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      // TODO: once the production domain is final, add a per-route
      // canonical <link> (and update the og:image origin above to match).
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SearchPalette />
      <WhatsAppFab />
    </QueryClientProvider>
  );
}
