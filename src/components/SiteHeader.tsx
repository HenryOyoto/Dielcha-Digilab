import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { brandLogo } from "@/data/images";
import { services } from "@/data/site";
import { BrandWordmark } from "@/components/BrandWordmark";
import { EmailLink, WhatsAppLink } from "@/components/ContactLinks";
import { WhatsAppGlyph } from "@/components/SocialIcons";

const links = [
  { to: "/work", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/lab", label: "Lab" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };
  const openSearch = () => window.dispatchEvent(new Event("open-search"));

  return (
    <header className={`hdr ${scrolled ? "hdr--scrolled" : ""}`}>
      <div className="hdr__bar">
        <Link to="/" className="hdr__brand" aria-label="Dielcha Digilab home" onClick={close}>
          <img src={brandLogo} alt="" width={44} height={30} className="hdr__logo" />
          <BrandWordmark />
        </Link>

        <nav className="hdr__nav" aria-label="Main">
          <Link to="/" activeOptions={{ exact: true }} className="navlink" activeProps={{ className: "navlink is-active" }}>
            Home
          </Link>
          <div
            className="menu"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setServicesOpen(false);
            }}
          >
            <Link to="/services" className="navlink" activeProps={{ className: "navlink is-active" }} aria-haspopup="true" aria-expanded={servicesOpen} onClick={close}>
              Services <ChevronDown className="size-3.5" aria-hidden="true" />
            </Link>
            {servicesOpen && (
              <div className="menu__panel">
                {services.map((s) => (
                  <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="menu__item" onClick={close}>
                    <span className="menu__num">{s.number}</span>
                    <span>
                      <strong>{s.title}</strong>
                      <small>{s.short}</small>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="navlink" activeProps={{ className: "navlink is-active" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hdr__actions">
          <button type="button" className="icon-btn" onClick={openSearch} aria-label="Search the site">
            <Search className="size-[18px]" />
          </button>
          <WhatsAppLink className="icon-btn icon-btn--wa" label="Chat on WhatsApp">
            <WhatsAppGlyph className="size-5" />
          </WhatsAppLink>
          <Link to="/start-a-project" className="btn btn--primary btn--sm hdr__cta">
            Start a project <ArrowRight className="size-4" />
          </Link>
          <button type="button" className="icon-btn hdr__burger" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mnav">
          <nav aria-label="Mobile">
            <Link to="/" activeOptions={{ exact: true }} className="mnav__link" onClick={close}>Home</Link>
            <Link to="/services" className="mnav__link" onClick={close}>Services</Link>
            <ul className="mnav__sub">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} onClick={close}>{s.title}</Link>
                </li>
              ))}
            </ul>
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="mnav__link" onClick={close}>{l.label}</Link>
            ))}
          </nav>
          <div className="mnav__actions">
            <Link to="/start-a-project" className="btn btn--primary" onClick={close}>Start a project <ArrowRight className="size-4" /></Link>
            <WhatsAppLink className="btn btn--wa">
              <WhatsAppGlyph className="size-5" /> WhatsApp
            </WhatsAppLink>
            <EmailLink className="btn btn--ghost">Email us</EmailLink>
          </div>
        </div>
      )}
    </header>
  );
}
