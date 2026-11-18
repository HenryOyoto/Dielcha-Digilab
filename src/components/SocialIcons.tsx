import { useId } from "react";
import { socialLinks } from "@/data/site";
import { WhatsAppLink } from "@/components/ContactLinks";

const YOUTUBE_PATH =
  "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";

export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.9L2.3 21.8l4.8-1.3A9.8 9.8 0 1 0 12 2.2Zm0 1.8a8 8 0 1 1-4.2 14.8l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 0 1 12 4Z" />
      <path d="M8.9 7.6c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2.1.4 0 .6l-.4.6c-.1.2-.1.3 0 .5.5.9 1.4 1.8 2.5 2.3.2.1.4.1.5-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .6-.3 1.2-.8 1.5-.6.4-1.4.4-2.2.1-2.5-.9-4.2-2.8-5-4.7-.3-.8-.2-1.7.4-2.4Z" />
    </svg>
  );
}

export function YouTubeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d={YOUTUBE_PATH} />
    </svg>
  );
}

export function GitHubGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function FacebookGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z" />
    </svg>
  );
}

function InstagramGlyph({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FFB800" />
          <stop offset=".5" stopColor="#E1306C" />
          <stop offset="1" stopColor="#7A2BD0" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke={`url(#${id})`} strokeWidth="2" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke={`url(#${id})`} strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill={`url(#${id})`} />
    </svg>
  );
}

const glyphs = {
  youtube: <YouTubeGlyph className="size-5 text-[#ff0000]" />,
  github: <GitHubGlyph className="size-5 text-[#24292f]" />,
  instagram: <InstagramGlyph className="size-5" />,
  facebook: <FacebookGlyph className="size-5 text-[#1877f2]" />,
};

/** Round social buttons. Only platforms with a real destination are listed; WhatsApp opens a link built in the browser. */
export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`social ${className}`}>
      {socialLinks.map((s) => (
        <li key={s.name}>
          <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} className="social__btn">
            {glyphs[s.icon]}
          </a>
        </li>
      ))}
      <li>
        <WhatsAppLink className="social__btn" label="WhatsApp">
          <WhatsAppGlyph className="size-5 text-[#25d366]" />
        </WhatsAppLink>
      </li>
    </ul>
  );
}
