import heroPcb3d from "@/assets/hero-pcb-3d.webp";
import heroEmbedded from "@/assets/hero-embedded-scene.webp";
import heroEnclosure from "@/assets/hero-enclosure-cad.webp";
import heroDashboard from "@/assets/hero-iot-dashboard.webp";
import cardPcb from "@/assets/art-premfg.jpg";
import cardEmbedded from "@/assets/bg-lab.jpg";
import cardCad from "@/assets/hero-cad.jpg";
import cardDocs from "@/assets/hero-reverse.jpg";
import resourcePcbPrefab from "@/assets/resources/pcb-pre-fabrication-checklist.jpg";
import resourcePcbReview from "@/assets/resources/pcb-design-review-checklist.jpg";
import resourceBom from "@/assets/resources/bom-review-checklist.jpg";
import resourceComponent from "@/assets/resources/component-selection-worksheet.jpg";
import articleSchematic from "@/assets/articles/from-schematic-to-pcb.jpg";
import articlePowerRails from "@/assets/articles/understanding-power-rails.jpg";
import articleEsp32 from "@/assets/articles/esp32-prototype-notes.jpg";
import articlePcbMistakes from "@/assets/articles/common-pcb-design-mistakes.jpg";

export const WHATSAPP_NUMBER = "254715924448";
export const WHATSAPP_MESSAGE = "Hello DIELCHA DIGILAB, I would like to discuss a project.";
export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const instagramLink = "https://www.instagram.com/dielchadigilab";
export const githubLink = "https://github.com/DielchaDigilab";

export const socialLinks = [
  { name: "GitHub", icon: "github" as const, url: githubLink },
  { name: "Instagram", icon: "instagram" as const, url: instagramLink },
  { name: "Facebook", icon: "facebook" as const, url: "https://www.facebook.com/profile.php?id=61592998569753" },
  { name: "WhatsApp", icon: "whatsapp" as const, url: whatsappLink },
];

export const brand = {
  name: "DIELCHA DIGILAB",
  tagline: "Engineering & Digital Product Development",
  motto: "",
  positioning: "DIELCHA DIGILAB designs and develops electronic hardware, embedded systems, connected devices, engineering designs and supporting software when a product or connected system needs it.",
  email: "dielcha.digilab@gmail.com",
  phone: "+254715924448",
  whatsapp: "+254715924448",
  social: socialLinks,
};

export type HeroSlide = {
  image: string;
  alt: string;
  label: string;
  /** Background tint of the slide. */
  tone: "blue" | "green" | "yellow" | "red";
  /** "cutout" images are transparent and sit directly on the tint; "photo" images are shown in a rounded frame. */
  fit: "cutout" | "photo";
  width: number;
  height: number;
  points: string[];
};

export const heroSlides: HeroSlide[] = [
  {
    image: heroPcb3d, alt: "3D view of a multi-layer PCB layout", label: "PCB Design, Layout & 3D",
    tone: "blue", fit: "cutout", width: 1030, height: 625,
    points: ["Schematic capture and PCB layout", "3D board models for fit checks", "Design files delivered online"],
  },
  {
    image: heroEmbedded, alt: "A drone, a four-wheel robot and a robotic arm built on embedded controllers", label: "Embedded Systems & IoT",
    tone: "green", fit: "cutout", width: 1480, height: 1260,
    points: ["ESP32 and Arduino firmware in C/C++", "Sensors, Wi-Fi and Bluetooth", "Robots, drones and connected devices"],
  },
  {
    image: heroEnclosure, alt: "3D CAD model of an enclosure with a display, battery and PCB inside", label: "Enclosure & CAD Design",
    tone: "yellow", fit: "cutout", width: 1036, height: 748,
    points: ["3D enclosures that fit your PCB", "STEP and STL files for 3D printing", "Dimensioned 2D drawings"],
  },
  {
    image: heroDashboard, alt: "IoT monitoring dashboard showing device status, alerts and live sensor readings", label: "IoT Dashboards & Monitoring",
    tone: "red", fit: "photo", width: 773, height: 630,
    points: ["Live device and sensor dashboards", "Alerts, trends and reports", "Cloud and API integration"],
  },
];

export type Service = {
  number: string; slug: string; title: string; short: string; image: string; tags: string[];
  overview: string; capabilities: string[]; deliverables: string[];
  audience: string[]; requirement: string; process: string[]; ctaLabel: string;
  metaTitle: string; metaDescription: string;
};

export const services: Service[] = [
  {
    number: "01", slug: "electronics-systems-pcb-design", title: "Electronics Systems & PCB Design",
    short: "Schematic design, PCB layout, 3D board models and design files.", image: cardPcb,
    tags: ["SCHEMATIC", "PCB", "BOM", "GERBER", "DFM"],
    overview: "Design and documentation of electronic hardware from system requirements through schematic capture, PCB layout and manufacturing files.",
    capabilities: ["Circuit and schematic design", "PCB layout and routing", "Component selection", "Power and signal design", "Multi-layer PCB design", "BOM preparation", "Gerber and manufacturing files", "DFM and design review", "Existing PCB analysis", "Schematic recreation"],
    deliverables: ["Schematic files", "PCB source files", "Gerber files", "BOM", "Assembly documentation", "Design review notes"],
    audience: ["Product developers and startups", "Engineering teams", "Businesses improving or replacing existing hardware"],
    requirement: "Work can usually be handled remotely using drawings, design files, measurements and technical information.",
    process: ["Requirements", "System Design", "Schematic", "PCB Layout", "Verification", "Manufacturing Files"],
    ctaLabel: "Explore Service", metaTitle: "Electronics Systems & PCB Design - DIELCHA DIGILAB",
    metaDescription: "Electronic hardware and PCB design including schematics, PCB layout, BOMs, Gerbers, DFM review and documentation.",
  },
  {
    number: "02", slug: "embedded-systems-iot", title: "Embedded Systems & IoT",
    short: "Firmware, sensors, connectivity and IoT integration.", image: cardEmbedded,
    tags: ["ESP32", "ARDUINO", "C/C++", "MICROPYTHON", "IOT"],
    overview: "Development of embedded systems that combine microcontrollers, sensors, actuators, communication interfaces and software.",
    capabilities: ["ESP32 and Arduino development", "C/C++ firmware", "MicroPython", "Sensor and actuator integration", "Wi-Fi and Bluetooth", "Data acquisition", "Embedded interfaces", "Hardware/firmware integration", "IoT architecture", "API and cloud integration"],
    deliverables: ["Firmware", "Circuit/interface documentation", "Prototype design", "Communication or IoT integration notes", "Test documentation"],
    audience: ["IoT prototypes", "Automation projects", "Sensor and control systems", "Early-stage product development"],
    requirement: "Most design and firmware work can be performed remotely; physical hardware is only needed when testing requires it.",
    process: ["Requirements", "Hardware", "Firmware", "Integration", "Testing"],
    ctaLabel: "Explore Service", metaTitle: "Embedded Systems & IoT - DIELCHA DIGILAB",
    metaDescription: "ESP32, Arduino, C/C++, MicroPython, sensors, connectivity, firmware and IoT development.",
  },
  {
    number: "03", slug: "engineering-design-product-cad", title: "Engineering Design & Product CAD",
    short: "Enclosures, 3D models and engineering drawings that fit your PCB.", image: cardCad,
    tags: ["3D CAD", "ENCLOSURES", "STEP", "STL", "DRAWINGS"],
    overview: "Mechanical design that supports electronic hardware, including enclosures, mounting features, clearances and technical drawings.",
    capabilities: ["3D enclosure design", "PCB-to-enclosure integration", "Component clearance checks", "Battery and connector placement", "Mounting features", "STEP/STL models", "3D-print-ready models", "2D engineering drawings", "CAD modifications"],
    deliverables: ["3D CAD models", "STEP/STL files", "2D drawings", "Dimensioned views", "Design revision files"],
    audience: ["PCB and electronics projects", "Prototype enclosures", "3D-printing projects", "Engineering documentation"],
    requirement: "Remote collaboration works through dimensions, PCB files, reference models, drawings and photographs.",
    process: ["Requirements", "Mechanical Layout", "3D Model", "Clearance Review", "Drawing", "Export"],
    ctaLabel: "Explore Service", metaTitle: "Engineering Design & Product CAD - DIELCHA DIGILAB",
    metaDescription: "Engineering design and product CAD for electronics enclosures, PCB integration, 3D models and technical drawings.",
  },
  {
    number: "04", slug: "engineering-documentation-technical-support", title: "Engineering Documentation & Technical Support",
    short: "Technical documents, diagrams, specifications and design reviews.", image: cardDocs,
    tags: ["DOCUMENTATION", "DIAGRAMS", "BOM", "REVIEW", "SUPPORT"],
    overview: "Technical documentation and support for electronic and engineering projects, including existing hardware that needs clearer records.",
    capabilities: ["Technical specifications", "Engineering reports", "System block diagrams", "Wiring diagrams", "Circuit and PCB documentation", "BOM documentation", "Assembly documentation", "Existing hardware documentation", "Design reviews", "Troubleshooting support"],
    deliverables: ["Technical reports", "Specifications", "Diagrams", "BOMs", "Review notes", "Organized project documentation"],
    audience: ["Engineering teams", "Product developers", "Businesses with incomplete technical records"],
    requirement: "Remote support uses project files, photographs, measurements, drawings and live discussion where needed.",
    process: ["Collect Information", "Review", "Document", "Verify", "Deliver"],
    ctaLabel: "Explore Service", metaTitle: "Engineering Documentation & Technical Support - DIELCHA DIGILAB",
    metaDescription: "Engineering reports, specifications, diagrams, BOMs, design reviews and technical support.",
  },
];

const projectFiles = import.meta.glob("/src/assets/projects/{esp32-drone-flight-controller-pcb,esp32-health-data-acquisition-monitoring-unit,tokenized-biometrics-school-feeding-program}/*.{png,jpg,jpeg,webp}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

function projectAsset(slug: string, filename: string) {
  return projectFiles[`/src/assets/projects/${slug}/${filename}`] ?? "";
}

export type Project = {
  slug: string; title: string; category: string; summary: string; image: string; hero: string; githubUrl: string;
  overview: string; objective: string; designApproach: string[]; technologies: string[];
  decisions: string[]; deliverables: string[]; notes: string[]; evidence: { image: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "esp32-drone-flight-controller-pcb", title: "ESP32 Drone Flight Controller PCB", category: "PCB Design", githubUrl: "https://github.com/DielchaDigilab/AeroCore-Flight-Controller",
    summary: "A compact flight-controller PCB design study built around an ESP32, with attention to programming access, power, sensors, connectors and physical placement.",
    image: projectAsset("esp32-drone-flight-controller-pcb", "cover.jpg"),
    hero: projectAsset("esp32-drone-flight-controller-pcb", "hero.webp"),
    overview: "An ESP32-based drone controller PCB design study focused on translating the circuit into a practical physical board while keeping development access and component placement visible throughout the design.",
    objective: "Create a compact controller board layout while identifying the physical constraints that need to be solved before fabrication.",
    designApproach: ["Define the main controller, sensor, power and connector interfaces", "Place the ESP32 and major interfaces before detailed routing", "Reserve physical access for USB/programming and connectors", "Review clearances, routing priorities and serviceability before fabrication"],
    technologies: ["ESP32", "KiCad", "PCB layout", "Embedded systems"],
    decisions: ["USB/programming access must remain physically accessible after assembly", "Component placement must account for connectors, cables and enclosure constraints", "Routing priorities should follow electrical function and power/signal requirements rather than only board compactness"],
    deliverables: ["Schematic", "PCB layout", "Design review notes", "Manufacturing-ready design files when finalized"],
    notes: ["This case study presents PCB design work and design decisions; it does not claim completed flight testing or fabricated-board performance."],
    evidence: [
      { image: projectAsset("esp32-drone-flight-controller-pcb", "01-system-architecture.jpg"), caption: "System architecture and controller interfaces" },
      { image: projectAsset("esp32-drone-flight-controller-pcb", "02-schematic.jpg"), caption: "Circuit schematic" },
      { image: projectAsset("esp32-drone-flight-controller-pcb", "03-pcb-layout.jpg"), caption: "PCB layout and routing" },
      { image: projectAsset("esp32-drone-flight-controller-pcb", "04-3d-board.jpg"), caption: "3D board and component placement" },
    ],
  },
  {
    slug: "esp32-health-data-acquisition-monitoring-unit", title: "ESP32 Health Data Acquisition & Monitoring Unit", category: "Embedded Systems", githubUrl: "https://github.com/DielchaDigilab/ESP32-Health-Data-Acquisition-and-Monitoring-Unit",
    summary: "A four-layer embedded electronics platform for acquiring, processing and recording physiological sensor data.",
    image: projectAsset("esp32-health-data-acquisition-monitoring-unit", "cover.jpg"),
    hero: projectAsset("esp32-health-data-acquisition-monitoring-unit", "hero.webp"),
    overview: "A four-layer embedded electronics platform for acquiring, processing and recording physiological sensor data. The design integrates an ESP32, ECG acquisition, heart-rate and SpO2 sensing, temperature measurement, microSD storage, USB Type-C, Ethernet, wireless connectivity and regulated power management. It is presented as a realistic engineering prototype/development project, not a certified medical device or clinically validated product.",
    objective: "Build a single board that can acquire multiple physiological signals, process them locally on an ESP32, log measurements to microSD and make the data available over Wi-Fi/Bluetooth or Ethernet for viewing or transfer.",
    designApproach: [
      "Organize the four-layer stack-up into clear analog, digital, power and RF sections with appropriate ground-via stitching",
      "Route the ECG acquisition front end and other analog sensing away from noisy digital and switching-power areas",
      "Keep the ESP32's 2.4 GHz Wi-Fi/Bluetooth RF section clear of copper with a proper matching network and antenna keep-out",
      "Provide microSD storage for on-device logging alongside USB Type-C and an Ethernet RJ45 + PHY for wired connectivity",
      "Regulate power through a buck-converter stage with LDOs and protection for the mixed analog/digital/RF loads",
      "Break out GPIO/I2C/SPI/UART headers, test points, status LEDs and buttons for bring-up and debugging",
      "Use high-speed/differential routing where the Ethernet PHY and other interfaces require it",
    ],
    technologies: ["ESP32", "ECG Acquisition Front End", "Heart-Rate / SpO2 Sensor Interface", "Temperature Sensor", "MicroSD", "USB Type-C", "Ethernet RJ45 + PHY", "Buck Converter", "LDOs", "4-Layer PCB Design", "KiCad"],
    decisions: [
      "Separate analog, digital, power and RF sections on the four-layer stack-up to protect sensitive physiological signal paths",
      "Include both wireless (Wi-Fi/Bluetooth) and wired (Ethernet) connectivity so the unit can fit different deployment environments",
      "Log data locally to microSD so measurements are preserved even without a live connection",
      "Expose test points and debug headers so bring-up and validation do not require rework",
    ],
    deliverables: ["Schematic", "4-layer PCB layout", "BOM", "Power and RF section documentation", "Test-point and bring-up notes"],
    notes: ["This is an engineering prototype/development project, not a certified medical device or clinically validated product."],
    evidence: [
      { image: projectAsset("esp32-health-data-acquisition-monitoring-unit", "01-system-architecture.jpg"), caption: "Health monitoring system architecture" },
      { image: projectAsset("esp32-health-data-acquisition-monitoring-unit", "02-schematic.jpg"), caption: "Circuit schematic" },
      { image: projectAsset("esp32-health-data-acquisition-monitoring-unit", "03-pcb-layout.jpg"), caption: "Four-layer PCB layout and routing" },
      { image: projectAsset("esp32-health-data-acquisition-monitoring-unit", "04-sensor-interfaces.jpg"), caption: "Sensor and connector interfaces" },
    ],
  },
  {
    slug: "tokenized-biometrics-school-feeding-program", title: "Tokenized Biometrics-Enhanced School Feeding Program", category: "IoT & Embedded Systems", githubUrl: "https://github.com/DielchaDigilab/Tokenized-Biometrics-Enhanced-School-Feeding-Program",
    summary: "A two-node ESP32 system that ties each learner's meal to a fingerprint token, verified at the serving point and settled through M-Pesa.",
    image: projectAsset("tokenized-biometrics-school-feeding-program", "cover.jpg"),
    hero: projectAsset("tokenized-biometrics-school-feeding-program", "hero.webp"),
    overview: "A tokenized school feeding system built around two ESP32 nodes: one dedicated to learner registration and fingerprint enrolment, and one dedicated to live meal verification and serving-point feedback. Every meal is tied to a fingerprint token, verified with an AS608 sensor, and settled through M-Pesa STK Push via the Daraja API, with all records synced to Firebase and surfaced on a React web dashboard.",
    objective: "Reduce meal-queue fraud and manual bookkeeping in a school feeding program by verifying each learner's identity with a fingerprint token and settling payment automatically through mobile money.",
    designApproach: [
      "Split the system into two ESP32 nodes: one for biometric registration and one for live meal serving and verification",
      "Use an AS608 fingerprint sensor for enrolment and fast per-meal verification",
      "Give clear pass/fail feedback at the serving point with an OLED display, a buzzer and red/green/blue status LEDs",
      "Power each node from four 18650 Li-ion cells regulated through an LM2596 buck converter for portable, mains-independent operation",
      "Tokenize each meal transaction and settle it through M-Pesa STK Push via the Daraja API",
      "Sync registration, verification and payment events to a Firebase database in real time",
      "Expose enrolment, meal records and payment status through a React web dashboard hosted on Netlify",
    ],
    technologies: ["ESP32 (x2)", "AS608 Fingerprint Sensor", "OLED Display", "Buzzer", "RGB LEDs", "LM2596 Buck Converter", "4x 18650 Li-ion Batteries", "Arduino IDE", "M-Pesa Daraja API (STK Push)", "Firebase", "React", "Netlify"],
    decisions: [
      "Separate registration and serving roles onto two ESP32 units so the serving unit stays fast and dedicated to the meal queue",
      "Use fingerprint tokenization rather than cards or PINs to prevent meal fraud and identity mix-ups",
      "Route payments through Daraja STK Push so parents and guardians can top up meal credit directly from a phone",
      "Keep the hardware portable and mains-independent using a Li-ion and buck-converter power stage",
    ],
    deliverables: ["Registration-node firmware", "Serving-node firmware", "PCB schematic and layout", "Firebase data schema", "M-Pesa Daraja payment integration", "React web dashboard", "Payment dashboard"],
    notes: ["This project combines embedded hardware, biometrics, mobile payments and a web dashboard into a single tokenized school-feeding workflow."],
    evidence: [
      { image: projectAsset("tokenized-biometrics-school-feeding-program", "01-system-architecture.jpg"), caption: "System architecture and node roles" },
      { image: projectAsset("tokenized-biometrics-school-feeding-program", "02-pcb-design.jpg"), caption: "PCB design and routing" },
      { image: projectAsset("tokenized-biometrics-school-feeding-program", "03-hardware-unit.jpg"), caption: "Biometric serving hardware" },
      { image: projectAsset("tokenized-biometrics-school-feeding-program", "04-dashboard-payment.jpg"), caption: "Dashboard and payment workflow" },
    ],
  },
];

/** Further work is shown on GitHub only: each entry links straight to its repository. */
export type GithubProject = { slug: string; title: string; category: string; summary: string; githubUrl: string };

export const githubProjects: GithubProject[] = [
  { slug: "excel-automation-system", title: "Excel Automation System", category: "Python Projects", summary: "A Python tool that automates routine Excel work: cleaning sheets, applying formulas and consolidating results without manual copy-paste.", githubUrl: "https://github.com/DielchaDigilab/Excel-Automation-System-GUI-Based" },
  { slug: "work-tracker-desktop-app", title: "Work Tracker Desktop App", category: "Python Projects", summary: "A desktop application for tracking office and freelance work, clients, projects, hours and invoices, built with PySide6 and SQLite.", githubUrl: "https://github.com/DielchaDigilab/Work-Tracker-Desktop-App" },
  { slug: "pcb-design-review-dfm", title: "PCB Design Review & DFM", category: "Design Review", summary: "A structured review workflow for checking a schematic, layout, BOM and manufacturing handoff before fabrication.", githubUrl: "https://github.com/DielchaDigilab/PCB-Design-Review-and-DFM" },
  { slug: "autonomous-4-wheel-robot", title: "Autonomous 4-Wheel Robot", category: "Robotics", summary: "A 4-wheel robot platform that senses obstacles and navigates around them automatically, with manual override for direct control.", githubUrl: "https://github.com/DielchaDigilab/Autonomous-4-Wheel-Robot" },
  { slug: "smart-parking-management-system-mpesa", title: "Smart Parking & Management System with M-Pesa Integration", category: "IoT & Embedded Systems", summary: "An IoT parking system that senses slot occupancy in real time and lets drivers pay for parking directly through M-Pesa.", githubUrl: "https://github.com/DielchaDigilab/Smart-Parking-and-Management-System-with-Mpesa-Integration" },
];

export const workflowSteps = [
  { title: "Share", text: "Send your idea, files, drawings or measurements." },
  { title: "Agree", text: "We confirm the scope, deliverables, timeline and cost." },
  { title: "Design", text: "We design and review, sharing progress online." },
  { title: "Deliver", text: "You receive the agreed files, organised and ready to use." },
];

export type Resource = {
  slug: string; title: string; description: string; format: string; fileLabel: string; image: string;
  detail: string; points: string[]; downloadLabel: string; downloadUrl: string;
};

export const resources: Resource[] = [
  {
    slug: "pcb-pre-fabrication-checklist", title: "PCB Pre-Fabrication Checklist",
    image: resourcePcbPrefab,
    description: "A final review reference for checking a PCB before fabrication files are released.", format: "PDF",
    fileLabel: "PDF checklist", detail: "Use this checklist as the final engineering gate before a PCB design is released to a manufacturer. It brings the schematic, PCB layout, footprints, clearances, board outline, silkscreen, documentation and fabrication outputs into one review sequence. The purpose is to catch issues while the source files are still easy to correct, rather than discovering them after fabrication or assembly.",
    points: ["Schematic and net consistency", "Footprints, references and component values", "Clearances, routing and board-edge checks", "Manufacturing outputs and documentation"],
    downloadLabel: "Download PDF", downloadUrl: "/resources/pcb-pre-fabrication-checklist.pdf",
  },
  {
    slug: "pcb-design-review-checklist", title: "PCB Design Review Checklist",
    image: resourcePcbReview,
    description: "Structured checks for reviewing schematic intent, layout quality and manufacturing readiness.", format: "PDF",
    fileLabel: "PDF checklist", detail: "This review reference provides a repeatable way to inspect a PCB design from electrical intent through physical layout and manufacturing readiness. It is especially useful when a second engineer, client or production partner needs to understand what was checked, what was found and what still needs attention before release.",
    points: ["Schematic review", "Component and footprint review", "Placement and routing review", "Manufacturing and documentation review"],
    downloadLabel: "Download PDF", downloadUrl: "/resources/pcb-design-review-checklist.pdf",
  },
  {
    slug: "bom-review-checklist", title: "BOM Review Checklist",
    image: resourceBom,
    description: "Checks for part numbers, packages, availability, lifecycle and alternatives before procurement or assembly.", format: "Excel",
    fileLabel: "Excel worksheet", detail: "A BOM review verifies more than whether every row contains a part number. Each component should be identifiable, compatible with its footprint and electrical role, realistically procurable, and documented well enough for purchasing and assembly. Checking lifecycle, availability and approved alternatives early also reduces the chance of a technically correct design becoming difficult or expensive to build.",
    points: ["Manufacturer and part-number checks", "Package and footprint consistency", "Availability and lifecycle considerations", "Approved alternatives and notes"],
    downloadLabel: "Download Excel worksheet", downloadUrl: "/resources/bom-review-checklist.xlsx",
  },
  {
    slug: "component-selection-worksheet", title: "Component Selection Worksheet",
    image: resourceComponent,
    description: "A structured worksheet for comparing component requirements and documenting engineering choices.", format: "Excel",
    fileLabel: "Excel worksheet", detail: "Use the worksheet before committing a component to the design. Compare electrical ratings, package and mechanical constraints, operating environment, availability, lifecycle and cost, then record why the selected part meets the actual requirement. Keeping the comparison documented makes later substitutions and design reviews much easier.",
    points: ["Electrical requirements", "Package and mechanical constraints", "Environmental requirements", "Cost, availability and alternatives"],
    downloadLabel: "Download Excel worksheet", downloadUrl: "/resources/component-selection-worksheet.xlsx",
  },
];

export type Article = {
  slug: string; title: string; category: string; summary: string; image: string;
  introduction: string; sections: { heading: string; text: string }[];
};

export const articles: Article[] = [
  {
    slug: "from-schematic-to-pcb", title: "From Schematic to PCB", category: "PCB Design", summary: "A practical look at the transition from circuit intent to physical PCB layout.", image: articleSchematic,
    introduction: "Moving from a schematic to a PCB is more than transferring symbols into a board editor. The physical layout must preserve the electrical intent while introducing placement, routing, mechanical and manufacturing constraints.",
    sections: [
      { heading: "Start with the circuit intent", text: "Confirm the functional blocks, interfaces, power requirements and important signal relationships before placing components on the board." },
      { heading: "Place before routing", text: "Major components, connectors and power circuitry should be positioned with access, signal flow, thermal considerations and mechanical constraints in mind." },
      { heading: "Route with priorities", text: "Power paths, sensitive signals, clocks and high-current connections may require different routing strategies. A compact board is not automatically a good board." },
      { heading: "Review before release", text: "Check design rules, clearances, footprints, silkscreen, board edges, manufacturing outputs and the relationship between the schematic and PCB." },
    ],
  },
  {
    slug: "understanding-power-rails", title: "Understanding Power Rails", category: "Hardware", summary: "How to think about power rails when reviewing or analysing electronic hardware.", image: articlePowerRails,
    introduction: "Power rails provide a useful way to understand an electronic system. Tracing where each rail originates, where it is converted and what loads it supplies can reveal how the system is organized.",
    sections: [
      { heading: "Identify the source", text: "Start at the incoming supply or battery and identify the protection, switching and conversion stages that follow." },
      { heading: "Follow each conversion", text: "Buck converters, boost converters, LDOs and other regulators create rails with specific voltage, current and sequencing requirements." },
      { heading: "Connect rails to loads", text: "Map each rail to the devices it supplies. This helps separate controller power, sensor power, communications power and other functional domains." },
      { heading: "Use measurements carefully", text: "When analysing real hardware, measurements should be recorded with the test point, expected value, operating condition and uncertainty clearly documented." },
    ],
  },
  {
    slug: "esp32-prototype-notes", title: "ESP32 Prototype Notes", category: "Embedded", summary: "Design notes and practical considerations when building ESP32-based prototypes.", image: articleEsp32,
    introduction: "ESP32 prototypes combine microcontroller firmware, power, sensors, communications and physical connections. Good prototype design therefore requires both software and hardware planning.",
    sections: [
      { heading: "Plan development access", text: "Keep USB, programming and debugging access physically reachable after the board is assembled or installed." },
      { heading: "Separate power concerns", text: "Consider regulator capability, decoupling, transient current demand and the effect of connected peripherals on the supply." },
      { heading: "Document interfaces", text: "Record GPIO assignments, sensor interfaces, communication buses, connector pinouts and firmware dependencies so the prototype can be maintained." },
      { heading: "Design for the next revision", text: "A prototype is an opportunity to capture lessons about placement, connectors, debugging and enclosure integration before the next hardware revision." },
    ],
  },
  {
    slug: "common-pcb-design-mistakes", title: "Common PCB Design Mistakes (And How to Avoid Them)", category: "PCB Design", summary: "Recurring layout, placement and documentation mistakes in PCB work, with practical fixes that help designs reach fabrication with fewer avoidable problems.", image: articlePcbMistakes,
    introduction: "Most PCB failures are not caused by exotic problems. They come from a short list of recurring mistakes in placement, routing, power and documentation that repeat across almost every project that goes wrong. This note collects the ones seen most often during design review, starting with the single most common layout mistake in ESP32 and other microcontroller-based boards.",
    sections: [
      { heading: "1. Placing the microcontroller in the middle of the board", text: "Putting the ESP32 (or any MCU) in the geometric centre of the PCB looks tidy but usually creates the worst layout. It forces power, USB, antenna and peripheral traces to cross the board from every direction, lengthens routing, and pushes the antenna keep-out zone into space needed by other parts. Place the MCU close to the edge nearest its most critical interface (USB, antenna, or main connector) and let everything else be arranged around it, not the other way round." },
      { heading: "2. Ignoring the RF antenna keep-out zone", text: "Wi-Fi and Bluetooth modules specify a keep-out area around the antenna with no copper, ground pour, components or nearby metal enclosures. Routing a trace or placing a via under the antenna, or mounting the module close to a metal edge, degrades range and can make wireless performance inconsistent between otherwise identical boards." },
      { heading: "3. Treating decoupling capacitors as an afterthought", text: "Decoupling capacitors placed far from the supply pin, or routed through a long thin trace instead of a short direct connection, do not do their job. Place them as close as physically possible to the IC's power pin, with a short low-inductance path to both the pin and ground, not wherever there happened to be free space." },
      { heading: "4. Using a single ground pour and assuming it solves everything", text: "A ground plane helps, but it is not a substitute for thinking about current return paths. Splitting analog and digital grounds without a clear single-point connection, or routing a noisy switching path directly over a sensitive analog return path, can inject noise even with a solid pour underneath." },
      { heading: "5. Undersized trace widths for the actual current", text: "Signal-width traces are often reused for power connections without checking the current they will carry. A regulator output, motor supply or LED array trace should be sized against expected current and copper weight, not copied from a neighbouring signal trace." },
      { heading: "6. Skipping fiducials and tolerances for assembly", text: "Boards that will be assembled by a pick-and-place service need fiducial markers, and passive components need enough spacing to survive placement tolerance and reflow. A board that is only ever hand-soldered can get away with tighter spacing; a board meant for panelised assembly usually cannot." },
      { heading: "7. Forgetting mechanical fit until the end", text: "Mounting holes, connector orientation, enclosure clearance and component height are frequently checked only after the layout is finished, when moving anything is expensive. Import the enclosure or mounting outline into the PCB tool at the start of placement, not after routing is complete." },
      { heading: "8. No clear power-up sequencing for multi-rail designs", text: "When a board has several supply rails feeding different ICs, some parts expect a specific power-up order or a minimum ramp rate. Skipping this check can cause intermittent boot failures that look like firmware bugs but are actually a power-sequencing problem." },
      { heading: "9. Silkscreen that does not match the assembled board", text: "Missing reference designators, silkscreen text placed under components after they are soldered, or polarity markings that are ambiguous on a small footprint all make assembly, debugging and rework slower and more error-prone than they need to be." },
      { heading: "10. No test points on critical nets", text: "Boards with no accessible point to probe a key rail, reset line or communication bus are far harder to bring up and debug. A handful of small test points on power rails and key signals costs almost nothing in board space and saves significant debugging time later." },
      { heading: "11. Routing high-speed or clock lines like any other signal", text: "Clock lines, crystal traces and high-speed buses are sensitive to length, symmetry and nearby noise sources. Routing them the same way as a slow GPIO signal, with long runs, sharp corners or routing under a switching regulator, can introduce timing and EMI problems that are hard to trace back to layout." },
      { heading: "12. Releasing fabrication files without a final review", text: "Many of the mistakes above are still fixable right up until fabrication files are generated. Skipping a structured final pass through the schematic, footprints, clearances and manufacturing outputs is often the real root cause behind boards that come back with an avoidable, easily-checked defect." },
    ],
  },
];

/** Cover plus evidence views, de-duplicated, for the quick-view gallery. */
export function projectGallery(p: Project): { image: string; caption: string }[] {
  const seen = new Set<string>();
  const list = [{ image: p.image, caption: "Project overview" }, ...p.evidence];
  return list.filter((g) => g.image && (seen.has(g.image) ? false : (seen.add(g.image), true)));
}
