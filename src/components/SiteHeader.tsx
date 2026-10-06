import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { whatsappLink, services } from "@/data/site";
import { WhatsAppGlyph } from "@/components/SocialIcons";
import { BrandWordmark } from "@/components/BrandWordmark";
import logo from "@/assets/logo-icon.png";

const accentCycle = ["primary", "secondary", "destructive"] as const;

const serviceLinks = services.map((s, i) => ({
  to: "/services/$slug" as const,
  params: { slug: s.slug },
  label: s.title,
  description: s.short,
  number: s.number,
  color: accentCycle[i % accentCycle.length],
}));

const nav = [
  { to: "/", label: "Home", exact: true, color: "primary" as const, children: null },
  { to: "/services", label: "Services", exact: false, color: "secondary" as const, children: serviceLinks },
  // Projects intentionally remains a simple navigation link; its portfolio
  // is no longer duplicated in a hover dropdown.
  { to: "/work", label: "Projects", exact: false, color: "destructive" as const, children: null },
  { to: "/about", label: "About", exact: false, color: "primary" as const, children: null },
  { to: "/lab", label: "Lab", exact: false, color: "secondary" as const, children: null },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 260);
  };

  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  useEffect(() => () => cancelClose(), []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="Dielcha Digilab logo" width={512} height={512} className="h-10 w-auto object-contain sm:h-11" />
          <BrandWordmark className="text-[1.05rem] sm:text-xl" />
        </Link>

        <nav ref={navRef} className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {nav.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className={`nav-link nav-link--${item.color}`}
                  activeProps={{ className: `nav-link nav-link--${item.color} nav-link--active` }}
                >
                  {item.label}
                </Link>
              );
            }

            const isOpen = openMenu === item.to;
            return (
              <div
                key={item.to}
                className="nav-menu relative"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(item.to);
                }}
                onMouseLeave={scheduleClose}
              >
                <div className="flex items-center gap-1">
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.exact }}
                    className={`nav-link nav-link--${item.color}`}
                    activeProps={{ className: `nav-link nav-link--${item.color} nav-link--active` }}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${item.label} submenu`}
                    aria-expanded={isOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      cancelClose();
                      setOpenMenu(isOpen ? null : item.to);
                    }}
                    className="nav-chevron rounded-md p-1 text-primary transition-colors hover:bg-primary/10"
                  >
                    <ChevronDown className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                <div
                  className={`nav-dropdown ${isOpen ? "nav-dropdown--open" : ""}`}
                  role="menu"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="nav-dropdown__header">
                    <div>
                      <span className="font-display text-xs font-bold uppercase tracking-[0.08em] text-secondary">Engineering services</span>
                      <p className="mt-1 text-xs text-primary/70">Design, develop and document with a clear engineering workflow.</p>
                    </div>
                    <Link to="/services" onClick={() => setOpenMenu(null)} className="nav-dropdown__all" aria-label="View all services">
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>

                  <div className="nav-dropdown__grid">
                    {item.children.map((child) => (
                      <Link
                        key={`${child.to}-${child.params.slug}`}
                        to={child.to}
                        params={child.params}
                        role="menuitem"
                        onClick={() => setOpenMenu(null)}
                        className={`nav-dropdown__item nav-dropdown__item--${child.color}`}
                      >
                        <span className={`nav-dropdown__number nav-dropdown__number--${child.color}`} aria-hidden="true">{child.number}</span>
                        <span className="min-w-0">
                          <span className="block leading-snug">{child.label}</span>
                          <span className="mt-1 block line-clamp-2 text-[0.7rem] font-normal leading-relaxed text-primary/60">{child.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>

                  <Link to="/services" onClick={() => setOpenMenu(null)} className="nav-dropdown__footer">
                    Explore all engineering services <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="brand-whatsapp-link">
            <WhatsAppGlyph className="size-5" />
          </a>
          <Link to="/start-a-project" className="btn-brand-primary rounded-lg px-4 py-2.5 text-sm font-semibold text-white">
            Start a Project
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => {
            setOpen((v) => !v);
            setMobileSubmenu(null);
          }}
          className="rounded-lg border border-primary/20 bg-white p-2.5 text-primary shadow-sm transition-colors hover:bg-primary/5 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-5 shadow-lift lg:hidden" aria-label="Mobile navigation">
          {nav.map((item) => {
            if (!item.children) {
              return (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={`mobile-nav-link mobile-nav-link--${item.color}`}>
                  {item.label}
                </Link>
              );
            }

            const isOpen = mobileSubmenu === item.to;
            return (
              <div key={item.to} className="border-b border-border">
                <div className="flex items-center justify-between py-3">
                  <Link to={item.to} onClick={() => setOpen(false)} className="text-sm font-semibold text-primary">
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${item.label} submenu`}
                    aria-expanded={isOpen}
                    onClick={() => setMobileSubmenu(isOpen ? null : item.to)}
                    className="rounded-md bg-secondary/10 p-1.5 text-secondary"
                  >
                    <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {isOpen && (
                  <div className="flex flex-col gap-1 pb-3 pl-2">
                    {item.children.map((child) => (
                      <Link
                        key={`${child.to}-${child.params.slug}`}
                        to={child.to}
                        params={child.params}
                        onClick={() => {
                          setOpen(false);
                          setMobileSubmenu(null);
                        }}
                        className={`nav-dropdown__item nav-dropdown__item--${child.color}`}
                      >
                        <span className={`nav-dropdown__number nav-dropdown__number--${child.color}`} aria-hidden="true">{child.number}</span>
                        <span className="min-w-0">
                          <span className="block leading-snug">{child.label}</span>
                          <span className="mt-1 block text-[0.7rem] font-normal leading-relaxed text-primary/60">{child.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 py-3 text-sm font-semibold text-secondary">
            <WhatsAppGlyph className="size-5" />
            WhatsApp
          </a>
          <Link to="/start-a-project" onClick={() => setOpen(false)} className="btn-brand-primary mt-2 block rounded-lg px-4 py-3 text-center text-sm font-semibold text-white">
            Start a Project
          </Link>
        </nav>
      )}
    </header>
  );
}
