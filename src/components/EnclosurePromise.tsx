import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { ToolList } from "@/components/Toolbox";
import { heroEnclosureCad } from "@/data/images";

/** The promise that every board or project comes with an enclosure designed for it. */
export function EnclosurePromise() {
  return (
    <section className="section enc">
      <div className="container-x enc__grid">
        <div className="enc__media">
          <span className="enc__back" aria-hidden="true" />
          <img src={heroEnclosureCad} alt="3D CAD model of an elegant enclosure with a display, battery and circuit board inside" width={1036} height={748} loading="lazy" decoding="async" />
        </div>
        <div className="enc__copy">
          <h2 className="h2">
            Every board comes with <span className="mark mark--gold">a home of its own.</span>
          </h2>
          <p className="lead">
            For every PCB and every project, we design the enclosure too. It is built around your board&rsquo;s own 3D model from KiCad and finished in AutoCAD or FreeCAD, so your hardware looks as refined as it works.
          </p>
          <ul className="checks enc__checks">
            <li><Check className="size-4" aria-hidden="true" />A fine, elegant case made for your board</li>
            <li><Check className="size-4" aria-hidden="true" />An exact fit, taken from the 3D board model</li>
            <li><Check className="size-4" aria-hidden="true" />STEP and STL files, ready for 3D printing or manufacturing</li>
          </ul>
          <ToolList keys={["kicad", "autocad", "freecad"]} />
          <Link to="/services/$slug" params={{ slug: "engineering-design-product-cad" }} className="btn btn--primary">
            See enclosure design <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
