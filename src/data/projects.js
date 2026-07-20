/**
 * Portfolio projects
 * kind: 'praxis'  — real work; code not fully public; GitHub = architecture/facts
 * kind: 'product' — public product / open demo
 */

export const projects = [
  {
    id: "widerspruch-jetzt",
    title: "widerspruch.jetzt",
    subtitle: "RAG-Produkt für formelle Widersprüche (SGB II / SGB X)",
    kind: "product",
    featured: true,
    confidential: false,
    stack: [
      "Python",
      "FastAPI",
      "RAG",
      "Chroma",
      "E5 Embeddings",
      "HuggingFace",
      "Docker",
      "Railway",
      "Stripe",
    ],
    useCase:
      "Jobcenter-Bescheide sind schwer lesbar, Fristen kurz. Viele Menschen verlieren Leistungen, weil sie nicht formal und rechtzeitig reagieren können.",
    result:
      "End-to-End RAG-Produkt: Gesetze indexieren, relevante Paragraphen holen, formellen Widerspruch generieren – mit Guards, Zitier-Allowlist und Live-Demo.",
    problem:
      "Jobcenter-Bescheide (Sanktionen, Kürzungen) sind schwer lesbar. Fristen sind kurz – formelle, fristgerechte Reaktion entscheidet oft über Geld.",
    solution:
      "Ingest offizieller SGB-II/X-Texte → Chroma + E5 → Retrieval → LLM-Generierung mit Citation-Allowlist, Claim-Softening und Domain-Guards. UI, Preview, optional Stripe, PDF/TXT-Export.",
    metrics: [
      "Live-Demo auf Railway",
      "RAG: Chroma + multilingual E5",
      "Safety-Pipeline (Guards + Citations)",
      "Docker + HF Cloud / Ollama lokal",
    ],
    architecture: [
      "Offline Ingest → Chunk → Index",
      "Retrieve mit Distance-Filter",
      "Multi-Stage Generation + Guards",
      "API: FastAPI · UI · Health/Live",
    ],
    role: "Fullstack · Applied RAG Product",
    href: "https://sgb2-rag-production.up.railway.app/ui/",
    secondaryHref: "https://github.com/SkoofyDoo/widerspruch.jetzt",
    label: "Live Demo",
    secondaryLabel: "GitHub",
    accent: "from-cyan-500/30 via-sky-600/10 to-transparent",
    previewLabel: "RAG · FastAPI · Live",
    media: {
      type: "external",
      note: "Demo-GIF im Repo docs/assets/demo-preview.gif",
    },
    flow: ["Ingest Laws", "Retrieve", "Generate", "Guards", "PDF/Preview"],
  },
  {
    id: "3d-vorschau-pipeline",
    title: "3D-Vorschau-Pipeline",
    subtitle: "Headless Rendering & Modellschutz",
    kind: "praxis",
    featured: true,
    confidential: true,
    stack: [
      "Node.js",
      "Express",
      "Puppeteer",
      "Three.js",
      "WebGL2",
      "SSE",
      "Nextcloud WebDAV",
    ],
    useCase:
      "Medizintechnischer Kontext: 3D-Scans brauchen sichere Vorschaubilder für Freigabe – ohne das Originalmodell preiszugeben und ohne manuelle Screenshots.",
    result:
      "Serverseitige Pipeline rendert 12 Kameraansichten (Textur + Wireframe) headless und steuert den Approval-Workflow.",
    problem:
      "3D-Medizinscans brauchen automatisierte Vorschaubilder – sicher, reproduzierbar, ohne Modell-Leak und ohne manuelle Screenshot-Arbeit.",
    solution:
      "Puppeteer startet headless Chromium, führt Three.js/WebGL2 aus und liefert 12 Views plus SSE-Fortschritt und Freigabe-Flow.",
    metrics: [
      "12 Kameraansichten pro Modell",
      "Textur + Wireframe-Output",
      "Headless WebGL2 via Puppeteer",
      "Modellschutz: Preview ≠ Original",
    ],
    architecture: [
      "Upload / WebDAV Source",
      "Headless Render Worker",
      "SSE Progress",
      "Approval UI + Cognito",
      "DynamoDB State",
    ],
    role: "Fullstack · 3D Rendering Pipeline",
    href: "https://github.com/SkoofyDoo/3D-Vorschau-Pipeline-Headless-Rendering-Approval-Workflow",
    label: "Architektur & Fakten",
    accent: "from-sky-500/30 via-blue-600/10 to-transparent",
    previewLabel: "Praxis · Headless 3D",
    media: null,
    flow: ["Source", "Headless WebGL", "12 Views", "Approval", "Store"],
  },
  {
    id: "dallio",
    title: "Dallio",
    subtitle: "Smart Document Analyzer für DE-Bürokratie",
    kind: "product",
    featured: true,
    confidential: false,
    stack: ["S3", "Lambda", "Bedrock", "DynamoDB", "Cognito", "Amplify"],
    useCase:
      "Rechnungen, Behördenbriefe und Termine in Deutschland sind fragmentiert – scannen, sortieren und nachhalten kostet Zeit.",
    result:
      "Cloud-native Assistent: Dokumente digitalisieren, Finanzen tracken, Termine aus Briefen extrahieren – live unter dallio.de.",
    problem:
      "Behördenschreiben und Rechnungen landen unstrukturiert im Alltag. Manuell scannen und Termine nachhalten ist fehleranfällig.",
    solution:
      "AWS-Stack mit Bedrock für Dokumenten-KI, Cognito-Auth, S3/Lambda/DynamoDB für Pipeline und Speicher.",
    metrics: [
      "Live-Produkt: dallio.de",
      "AWS serverless + EC2",
      "Bedrock Dokumenten-KI",
      "Cognito Auth",
    ],
    architecture: [
      "Auth (Cognito)",
      "Upload → S3",
      "Lambda + Bedrock",
      "DynamoDB Records",
      "Amplify Frontend",
    ],
    role: "Fullstack · Cloud Product",
    href: "https://dallio.de",
    secondaryHref: "https://github.com/SkoofyDoo/Dallio",
    label: "Dallio.de",
    secondaryLabel: "GitHub",
    accent: "from-violet-500/30 via-indigo-600/10 to-transparent",
    previewLabel: "Product · AWS · Live",
    media: null,
    flow: ["Upload", "Analyze", "Extract", "Track", "Notify"],
  },
  {
    id: "sharpeye",
    title: "SharpEye",
    subtitle: "Image Quality Control Library (CLI · API · Agents)",
    kind: "product",
    featured: false,
    confidential: false,
    stack: ["Python", "FastAPI", "CLI", "YAML Presets", "pytest", "Gradio"],
    useCase:
      "ML-Datasets und Telemedizin-Fotos brauchen QC mit lesbaren Verdicts – nicht nur einen Score 0.42.",
    result:
      "Library mit Presets, Batch-CLI, REST-API und Agent-Tool-Schema: blur, exposure, JPEG-Artefakte → FAIL + Handlungsempfehlung.",
    problem:
      "Rohe NR-IQA-Scores sind schwer in Pipelines und für Agenten nutzbar. Teams brauchen Gates, Reports und klare Sprache.",
    solution:
      "Pipeline + YAML-Presets (dataset_cleaner, telemedicine), CSV-Reports, FastAPI + structured FrameReport für Agents.",
    metrics: [
      "Human-readable Verdicts",
      "YAML Presets pro Use Case",
      "CLI Batch + CSV Report",
      "Agent schema: /v1/schema/tools",
    ],
    architecture: [
      "Pipeline.from_preset()",
      "Metrics + Gates",
      "CLI clean",
      "REST + Gradio Demo",
    ],
    role: "Backend · Computer Vision Library",
    href: "https://github.com/SkoofyDoo/sharpeye",
    label: "GitHub",
    accent: "from-amber-500/25 via-orange-600/10 to-transparent",
    previewLabel: "Open Source · QC",
    media: null,
    flow: ["Image/ZIP", "Metrics", "Gate", "Verdict", "Report"],
  },
  {
    id: "video-slicer",
    title: "Client-Based-VideoSlicer",
    subtitle: "Frame-Extraktion im Browser",
    kind: "praxis",
    featured: false,
    confidential: true,
    stack: ["JavaScript", "React"],
    useCase:
      "Für Media-Workflows müssen Frames aus Video geschnitten werden – oft ohne teure Upload-/Backend-Pipeline.",
    result:
      "React-Komponente extrahiert Frames vollständig client-side: 0 Backend, 0 externe Media-Libs.",
    problem:
      "Server-side Frame-Cutting bedeutet Upload-Kosten, Latenz und Infrastruktur – oft unnötig.",
    solution:
      "Browser-native Extraktion über Video/Canvas – rein im Client, pipeline-tauglich als Baustein.",
    metrics: [
      "100% client-side",
      "0 Backend-Kosten",
      "Keine Upload-Pipeline",
      "Keine externen Media-Libs",
    ],
    architecture: ["Video element", "Canvas capture", "Frame list", "Export"],
    role: "Frontend · Media",
    href: "https://github.com/SkoofyDoo/Client-Based-VideoSlicer",
    label: "Architektur & Fakten",
    accent: "from-emerald-500/25 via-teal-600/10 to-transparent",
    previewLabel: "Praxis · Browser Frames",
    media: null,
    flow: ["Video", "Seek", "Capture", "Frames", "Export"],
  },
  {
    id: "schaerfe-analyse",
    title: "Automatisierte Schärfe-Analyse",
    subtitle: "Server-side Frame Quality Filter",
    kind: "praxis",
    featured: false,
    confidential: true,
    stack: ["Node.js", "OpenCV.WASM", "Sharp", "archiver"],
    useCase:
      "In Video-/Scan-Pipelines müssen unscharfe Frames raus, bevor sie weiterverarbeitet oder gelabelt werden.",
    result:
      "Node-Modul bewertet Schärfe mit OpenCV.WASM, filtert und archiviert die besten Frames als ZIP.",
    problem:
      "Manuelles Filtern ist langsam und subjektiv – unbrauchbar in automatisierten Pipelines.",
    solution:
      "Server-side Schärfebewertung, Auto-Filter, ZIP der Top-Frames – anschlussfähig an Media-Pipelines.",
    metrics: [
      "OpenCV.WASM on server",
      "Auto-Filter unscharfer Frames",
      "ZIP-Export der Besten",
      "Pipeline-fähig",
    ],
    architecture: [
      "Frame batch in",
      "Sharpness score",
      "Threshold gate",
      "ZIP archive",
    ],
    role: "Backend · Computer Vision",
    href: "https://github.com/SkoofyDoo/Automatisierte-Schaerfe-Analyse",
    label: "Architektur & Fakten",
    accent: "from-yellow-500/20 via-amber-700/10 to-transparent",
    previewLabel: "Praxis · OpenCV",
    media: null,
    flow: ["Frames", "Score", "Filter", "Best-N", "ZIP"],
  },
];
