import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { brandLogo } from "@/data/images";
import { brand, services } from "@/data/site";
import { BrandWordmark } from "@/components/BrandWordmark";
import { SocialIcons } from "@/components/SocialIcons";

/** Site footer. It deliberately shows no email address or phone number: contact happens through the cards on the Start a project page. */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container-x footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Dielcha Digilab home">
            <img src={brandLogo} alt="" width={52} height={35} />
            <BrandWordmark />
          </Link>
          <p>{brand.positioning}</p>
          <SocialIcons />
        </div>

        <nav className="footer__col" aria-label="Explore">
          <h2>Explore</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/work">Projects</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/lab">Lab</Link></li>
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Services">
          <h2>Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__cta">
          <h2>Have an idea?</h2>
          <p>Tell us about it. We would love to hear it.</p>
          <Link to="/start-a-project" className="btn btn--gold">
            Start a project <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="container-x footer__bar">
        <p>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        <p className="footer__legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
