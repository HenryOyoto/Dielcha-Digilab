import workflowRequirements from "@/assets/hero-reverse.jpg";
import workflowReview from "@/assets/hero-dfm.jpg";
import workflowAgreement from "@/assets/art-premfg.jpg";
import workflowDesign from "@/assets/hero-pcb.jpg";
import workflowDeliver from "@/assets/hero-cad.jpg";
import { workflowSteps } from "@/data/site";

const images = [workflowRequirements, workflowReview, workflowAgreement, workflowDesign, workflowDeliver];

export function RemoteWorkSteps() {
  return (
    <div className="workflow-list">
      {workflowSteps.map((step, index) => (
        <article className={`workflow-row ${index % 2 ? "workflow-row--reverse" : ""}`} key={step.title}>
          <div className="workflow-row__image-wrap">
            <img src={images[index]} alt={step.title} className="workflow-row__image" />
          </div>
          <div className="workflow-row__content">
            <h3 className="text-2xl font-bold md:text-3xl">{step.title}</h3>
            <p className="mt-4 max-w-xl text-muted-foreground">{step.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
