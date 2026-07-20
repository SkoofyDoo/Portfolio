export const aboutText = {
  lead: "Ich bin Evgeny Kvest – Fachinformatiker für Anwendungsentwicklung aus Berlin.",
  body: "Ich entwickle Fullstack-Anwendungen mit JavaScript (React, JS, Node.js) und zunehmend Python (FastAPI, OpenCV, RAG). Stärken: Computer Vision und Media-Pipelines, Cloud-Bausteine (AWS), 3D im Web – plus schnelle Prototypen zur Ideenvalidierung und Automatisierungen mit klarem Produktfokus.",
  chips: [
    "FIAE · Berlin",
    "Python + JS + Node.js",
    "OpenCV",
    "Fullstack",
    "Prototyping",
    "Applied AI (im Aufbau)",
  ],
};

/** Target roles for recruiters – proof via projects */
export const roleFit = [
  {
    role: "Frontend",
    proof: "React, JavaScript, Three.js, client-side Video",
  },
  {
    role: "Backend",
    proof: "Node.js, Python/FastAPI, REST, Pipelines",
  },
  {
    role: "Fullstack",
    proof: "widerspruch.jetzt, Dallio, 3D-Pipeline",
  },
  {
    role: "Cloud",
    proof: "AWS (S3, Lambda, Cognito…), Railway",
  },
  {
    role: "Applied AI",
    proof: "RAG-Produkt, Bedrock, LangChain im Aufbau",
  },
  {
    role: "Computer Vision",
    proof: "OpenCV, SharpEye, Frame-QC Pipelines",
  },
];

/**
 * Soft skills / Arbeitsweise – honest junior strengths, DE hiring language
 */
export const softSkills = [
  {
    title: "Strukturiert & anforderungsorientiert",
    text: "Klare Definition von Zielen, technischen Entscheidungen und Rahmenbedingungen vor der Umsetzung.",
  },
  {
    title: "KI-Tools effizient & kritisch",
    text: "Sehr effiziente Nutzung moderner KI-Entwicklungstools (u. a. Grok-Build, Claude Code) zur schnellen Prototypisierung – bei hoher Kontrolle über Code-Qualität und Architektur.",
  },
  {
    title: "Eigeninitiative & Produktfokus",
    text: "Eigenständige Konzeption, Entwicklung und Deployment eines eigenen Produkts (Dallio) sowie anspruchsvolles Praktikum in einem Medtech-Startup.",
  },
  {
    title: "Pragmatisch & lösungsorientiert",
    text: "Fokus auf wartbare und wirksame Ergebnisse statt auf reinen Output – inkl. Automatisierungen und schnelle Validierungs-Prototypen.",
  },
  {
    title: "Systemdenken & Architektur",
    text: "Ausgeprägtes Interesse an Systemdenken, technischen Trade-offs und sauberer Architektur bereits auf Junior-Niveau.",
  },
  {
    title: "Schnelle Anpassungsfähigkeit",
    text: "Rasches Einarbeiten in neue Technologien und moderne Entwicklungsprozesse.",
  },
];

/**
 * Skill tiers – honest depth for junior positioning
 * core = produktionsnah, specialties = projekterfahrung, learning = im Aufbau
 */
export const skillGroups = {
  core: {
    title: "Core",
    subtitle: "Produktionsnah",
    highlight: true,
    items: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "FastAPI",
      "OpenCV",
      "Three.js",
      "REST APIs",
      "AWS",
    ],
  },
  specialties: {
    title: "Specialties",
    subtitle: "Projekterfahrung",
    highlight: false,
    items: [
      "Computer Vision",
      "Video- & Media-Pipelines",
      "Puppeteer",
      "Bedrock",
      "DynamoDB",
      "Cognito",
      "Express",
      "Stripe",
    ],
  },
  learning: {
    title: "Im Aufbau",
    subtitle: "Grundlagen · aktiv",
    highlight: false,
    muted: true,
    items: [
      "LangChain",
      "LangGraph",
      "RAG / Embeddings",
      "ML-Grundlagen mit SciKit-Learn",
      "Docker",
      "GitHub Actions",
    ],
  },
};
