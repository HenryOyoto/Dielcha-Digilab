import { tool, toolGroups, type ToolKey } from "@/data/tools";

/** One tool: its logo and name, linked to the official website so visitors can find out what it is. */
export function ToolChip({ toolKey }: { toolKey: ToolKey }) {
  const t = tool[toolKey];
  return (
    <li>
      <a
        className="tchip"
        href={t.url}
        target="_blank"
        rel="noreferrer noopener"
        title={`Visit the official ${t.name} website`}
        aria-label={`${t.name}, official website (opens in a new tab)`}
      >
        <img src={t.logo} alt="" width={28} height={28} loading="lazy" />
        <span>{t.name}</span>
      </a>
    </li>
  );
}

/** The tools we work with, grouped by the kind of work they are used for. */
export function Toolbox() {
  return (
    <div className="toolbox">
      {toolGroups.map((g) => (
        <section key={g.title} className={`tgroup tone-${g.tone}`}>
          <h3 className="tgroup__title">{g.title}</h3>
          <p className="tgroup__blurb">{g.blurb}</p>
          <ul className="tgroup__list">
            {g.keys.map((k) => (
              <ToolChip key={k} toolKey={k} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** Compact list of tools for one service. */
export function ToolList({ keys }: { keys: ToolKey[] }) {
  return (
    <ul className="tlist">
      {keys.map((k) => (
        <ToolChip key={k} toolKey={k} />
      ))}
    </ul>
  );
}
