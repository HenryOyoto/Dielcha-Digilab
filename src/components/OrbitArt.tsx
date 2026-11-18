import { useId } from "react";

/**
 * The orbit ring from the Dielcha logo, redrawn as a soft background shape.
 * It is purely decorative and sits behind content.
 */
export function OrbitArt({ className = "", dot = true, light = false }: { className?: string; dot?: boolean; light?: boolean }) {
  const id = useId();
  return (
    <svg className={`orbit ${className}`} viewBox="0 0 640 320" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffd23d" />
          <stop offset=".55" stopColor="#ffa31a" />
          <stop offset="1" stopColor="#ff6a1a" />
        </linearGradient>
      </defs>
      <g transform="rotate(-16 320 160)">
        <ellipse cx="320" cy="160" rx="300" ry="86" stroke={light ? "#ffffff" : `url(#${id})`} strokeOpacity={light ? 0.28 : 1} strokeWidth="14" />
        <ellipse cx="320" cy="160" rx="300" ry="86" stroke="#ffffff" strokeOpacity=".55" strokeWidth="3" transform="translate(0 -6)" />
        {dot && <circle cx="596" cy="196" r="14" fill="#1f4bff" />}
      </g>
    </svg>
  );
}
