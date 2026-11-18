import { tool, toolGroups, type ToolKey } from "@/data/tools";

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
              <li key={k} className="tchip">
                <img src={tool[k].logo} alt="" width={28} height={28} loading="lazy" />
                <span>{tool[k].name}</span>
              </li>
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
        <li key={k} className="tchip">
          <img src={tool[k].logo} alt="" width={28} height={28} loading="lazy" />
          <span>{tool[k].name}</span>
        </li>
      ))}
    </ul>
  );
}
