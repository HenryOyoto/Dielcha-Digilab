import { useId } from "react";

type Kind = "founder" | "engineer" | "maker" | "institution";

const look: Record<Kind, { tint: string; skin: string; shirt: string }> = {
  founder: { tint: "#dbe9f7", skin: "#8d5524", shirt: "#005090" },
  engineer: { tint: "#dcf0e5", skin: "#c68642", shirt: "#108040" },
  maker: { tint: "#fbefc2", skin: "#5c3a21", shirt: "#F0C000" },
  institution: { tint: "#f8dcdc", skin: "#e0ac69", shirt: "#D02020" },
};
const INK = "#1b1b1b";

/** Hand-drawn, brand-coloured people used for the "who we help" cards. */
export function Avatar({ kind, size = 56, label }: { kind: Kind; size?: number; label?: string }) {
  const id = useId();
  const c = look[kind];
  return (
    <svg viewBox="0 0 96 96" width={size} height={size} className="avatar" role="img" aria-label={label ?? kind}>
      <defs><clipPath id={id}><circle cx="48" cy="48" r="48" /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        <circle cx="48" cy="48" r="48" fill={c.tint} />
        {kind === "engineer" && <path d="M29 48C26 22 70 22 67 48V68H29Z" fill={INK} />}
        {kind === "institution" && (
          <g fill={INK}><circle cx="34" cy="36" r="9" /><circle cx="45" cy="29" r="10" /><circle cx="57" cy="29" r="10" /><circle cx="64" cy="37" r="9" /><circle cx="30" cy="46" r="6" /><circle cx="67" cy="46" r="6" /></g>
        )}
        <path d="M8 96C12 70 33 64 48 64S84 70 88 96Z" fill={c.shirt} />
        {kind === "maker" && <path d="M31 68C37 59 59 59 65 68" fill="none" stroke="#b88f00" strokeWidth="3" strokeLinecap="round" />}
        <rect x="42" y="54" width="12" height="14" fill={c.skin} />
        <ellipse cx="48" cy="44" rx="17" ry="19" fill={c.skin} />
        <path d="M40 64L48 77L56 64Z" fill={kind === "maker" ? "#b88f00" : "#fff"} />
        {kind === "founder" && (
          <>
            <path d="M31 42C30 24 66 24 65 42C60 34 38 34 31 42Z" fill={INK} />
            <g fill="none" stroke={INK} strokeWidth="2"><circle cx="41" cy="46" r="6.3" /><circle cx="55" cy="46" r="6.3" /><path d="M47.300 46H48.700" /></g>
          </>
        )}
        {kind === "engineer" && (
          <>
            <path d="M31 40C36 28 60 28 65 40C58 35 40 35 31 40Z" fill={INK} />
            <path d="M30 44C30 24 66 24 66 44" fill="none" stroke="#333" strokeWidth="3" />
            <rect x="26" y="42" width="7" height="13" rx="3" fill="#333" /><rect x="63" y="42" width="7" height="13" rx="3" fill="#333" />
            <path d="M30 54Q33 63 44 61" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {kind === "maker" && (
          <>
            <path d="M30 40C30 18 66 18 66 40Z" fill={INK} />
            <rect x="29" y="35" width="38" height="8" rx="4" fill="#333" />
          </>
        )}
        {kind === "institution" && <rect x="63" y="76" width="11" height="8" rx="1.500" fill="#fff" />}
        {kind !== "founder" && <><circle cx="42" cy="47" r="1.900" fill={INK} /><circle cx="54" cy="47" r="1.900" fill={INK} /></>}
        {kind === "founder" && <><circle cx="41" cy="46" r="1.800" fill={INK} /><circle cx="55" cy="46" r="1.800" fill={INK} /></>}
        <path d="M43 54Q48 58.500 53 54" fill="none" stroke={INK} strokeWidth="1.800" strokeLinecap="round" />
      </g>
    </svg>
  );
}
