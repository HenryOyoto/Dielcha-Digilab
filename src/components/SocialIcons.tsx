import { socialLinks } from "@/data/site";
import facebookIcon from "@/assets/facebook.webp";
import instagramIcon from "@/assets/instagram.webp";
import whatsappIcon from "@/assets/whatsapp.webp";
import githubIcon from "@/assets/github.svg";

const iconAssets: Record<string, string> = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  whatsapp: whatsappIcon,
  github: githubIcon,
};

export function SocialIcons({ className = "" }: { className?: string }) {
  // Only platforms with a real, configured destination are ever listed in
  // socialLinks (see src/data/site.ts), so every entry here is live.
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialLinks.map((s) => (
        <li key={s.name}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            title={s.name}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card transition-transform hover:scale-110"
          >
            <img src={iconAssets[s.icon]} alt="" aria-hidden="true" className="size-5 object-contain" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return <img src={whatsappIcon} alt="" aria-hidden="true" className={className} />;
}
