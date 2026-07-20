'use client'

export default function HeroOverlay({ onFlyToBerlin, flying }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/50 md:text-sm">
          Berlin · FIAE · Fullstack
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
          Evgeny Kvest
        </h1>
        <h2 className="mt-4 max-w-3xl text-base font-normal tracking-wide text-white/85 md:text-xl">
          Fullstack Developer · Python & JS · Computer Vision & Applied AI
        </h2>
        <p className="mt-3 max-w-xl text-sm font-normal text-zinc-400 md:text-base">
          Ich baue produktive Web- und Media-Systeme – Frontend, APIs, OpenCV-Pipelines, RAG-Prototypen und Automatisierungen.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projekte"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Projekte entdecken
          </a>
          <button
            type="button"
            onClick={onFlyToBerlin}
            className={`rounded-full border px-6 py-2.5 text-sm font-medium transition ${
              flying
                ? 'border-accent bg-accent/20 text-white'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
          >
            {flying ? 'Zurück zur Orbit-Ansicht' : '📍 Nach Berlin fliegen'}
          </button>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/evgeny-kvest-978137345/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/70 transition hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/SkoofyDoo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/70 transition hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            href="/EvgenyKvest_CV.pdf"
            download
            className="rounded-full border border-white/30 px-5 py-2 text-sm text-white transition hover:bg-white/10 backdrop-blur-sm"
          >
            CV ↓
          </a>
        </div>
      </div>

      <a
        href="#projekte"
        className="scroll-hint pointer-events-auto absolute bottom-10 hidden flex-col items-center gap-2 text-white/50 hover:text-white/80 transition md:flex"
        aria-label="Zu den Projekten scrollen"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </div>
  )
}
