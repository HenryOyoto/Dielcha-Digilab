import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { brand, services } from "@/data/site";
import { SocialIcons } from "@/components/SocialIcons";
import { BrandWordmark } from "@/components/BrandWordmark";
import { CopyButton } from "@/components/CopyButton";
import logo from "@/assets/logo-icon.png";

const explore = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Projects" },
  { to: "/lab", label: "Lab" },
  { to: "/about", label: "About" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 pb-7 pt-9 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="min-w-0">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} alt="Dielcha Digilab logo" width={512} height={512} className="h-10 w-auto rounded-lg bg-white object-contain p-1 shadow-card" />
            <BrandWordmark className="text-xl" />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-[#3a4654]">{brand.tagline}</p>
          <SocialIcons className="mt-4" />
        </div>

        <nav aria-label="Explore" className="min-w-0">
          <h3 className="footer-head footer-head--blue">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {explore.map((l) => (
              <li key={l.to}><Link to={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="min-w-0">
          <h3 className="footer-head footer-head--red">Services</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="footer-link">{s.title}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h3 className="footer-head footer-head--green">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#3a4654]">
            <li className="flex items-center gap-2.5"><Mail className="size-4 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" /><a href={`mailto:${brand.email}`} className="footer-link break-all">{brand.email}</a><CopyButton value={brand.email} label="email" /></li>
            <li className="flex items-center gap-2.5"><Phone className="size-4 shrink-0 text-[var(--brand-red)]" aria-hidden="true" /><a href={`tel:${brand.phone}`} className="footer-link">{brand.phone}</a><CopyButton value={brand.phone} label="phone number" /></li>
            <li className="flex items-center gap-2.5"><MapPin className="size-4 shrink-0 text-[var(--brand-green)]" aria-hidden="true" /><span>{brand.location}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--paper-edge)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 text-xs text-[#5b6673] sm:px-6">
          <span>© {brand.name}. All rights reserved.</span>
          <span className="flex gap-5">
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
