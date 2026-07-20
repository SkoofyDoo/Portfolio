# Portfolio – Evgeny Kvest

Interaktives 3D-Portfolio zur Präsentation von Projekten und Fähigkeiten als Fullstack-Entwickler (3D Web, Media Pipelines, Node.js, AWS).

## Live

🔗 [portfolio-tawny-nine-79.vercel.app](https://portfolio-tawny-nine-79.vercel.app)

---

## Vorschau

> 🌍 Ein interaktiver Globus rendert die Erde in Echtzeit – mit Day/Night-Cycle, Wolken, Fresnel-Atmosphäre, Bloom und **Fly-to-Berlin**. Darunter: Featured Case Studies, Skill-Hierarchie und Conversion-Kontakt.

---

## Features

- Echtzeit-3D-Globus mit Custom GLSL Shader (Day/Night, Normal Map, Specular)
- Fresnel-Atmosphere + Bloom Postprocessing (`UnrealBloomPass`)
- Animierter Mond, Partikel, Mouse-Parallax, Scroll-Dolly
- **Fly-to-Berlin** mit CSS2D-Label und Marker
- Sticky Glass-Navigation (Desktop)
- Featured Project Cases (Problem → Lösung → Metrics)
- 3D-Tilt Project Cards (Framer Motion)
- Kontakt mit Availability, mailto & Copy-Email
- Loading Progress, DPR-Cap, RAF-Pause offscreen, Three.js dispose
- `prefers-reduced-motion` Support

---

## Technischer Stack

- [Next.js](https://nextjs.org/) – React Framework
- [Three.js](https://threejs.org/) – 3D Rendering & WebGL
- [Framer Motion](https://www.framer.com/motion/) – Animationen
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Vercel Analytics](https://vercel.com/analytics) & Speed Insights

---

## Projekte im Portfolio

| Projekt | Art | Fokus |
|---|---|---|
| widerspruch.jetzt | Product · Live | RAG / FastAPI / SGB II+X Widersprüche |
| 3D-Vorschau-Pipeline | Praxis | Headless WebGL, Modellschutz |
| Dallio | Product · Live | Document AI (AWS Bedrock) |
| SharpEye | Product | Image QC library (CLI/API/Agents) |
| Client-Based-VideoSlicer | Praxis | Browser Frame Extraction |
| Automatisierte-Schärfe-Analyse | Praxis | Server Vision Pipeline |

Praxisprojekte: Architektur & Fakten auf GitHub — vollständiger Production-Code nicht öffentlich.

---

## Development

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

---

## Struktur

```
src/
  app/           # Next.js App Router
  components/    # UI + HeroScene (Three.js)
  data/          # projects.js, skills.js
public/          # Texturen, CV, project previews
```
