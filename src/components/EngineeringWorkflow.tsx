import { ArrowDown } from "lucide-react";
import { workflowSteps } from "@/data/site";
import workflowImage from "@/assets/hero-cad.jpg";

const nodeColors = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-destructive text-destructive-foreground",
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
];

export function EngineeringWorkflow() {
  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        {/* Label hidden on the website: <p className="label-mono text-accent">Engineering Workflow</p> */}
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">From Concept to Prototype-Ready Design</h2>
        <p className="mt-4 text-muted-foreground">
          A connected workflow that moves from requirements and review through engineering, development and delivery.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className="workflow-diagram">
          {workflowSteps.map((step, index) => (
            <div className="workflow-diagram__row" key={step.title}>
              <div className="workflow-diagram__rail">
                <span className={`workflow-diagram__node ${nodeColors[index % nodeColors.length]}`}>
                  {index + 1}
                </span>
                {index < workflowSteps.length - 1 && (
                  <span className="workflow-diagram__connector" aria-hidden="true">
                    <ArrowDown />
                  </span>
                )}
              </div>
              <div className="workflow-diagram__box">
                <h3 className="font-display text-base font-semibold sm:text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="workflow-diagram__image-wrap">
          <img src={workflowImage} alt="Engineering design and prototyping" className="workflow-diagram__image" />
        </div>
      </div>
    </div>
  );
}
