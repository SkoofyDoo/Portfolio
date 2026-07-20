'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const EMAIL = 'evgenykvest@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="kontakt" className="scroll-mt-28 border-t border-white/5 bg-zinc-950/80 py-24 md:py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
        >
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Kontakt
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Lassen Sie uns etwas Besseres bauen.
            </h2>
            <p className="mt-4 max-w-lg text-zinc-400 md:text-lg">
              {'Offen für '}
              <span className="text-zinc-200">Festanstellung</span>
              {' und '}
              <span className="text-zinc-200">Freelance</span>
              {' — Remote oder Berlin.'}
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
              Besonders interessant: Fullstack · Backend · Frontend · Computer Vision ·
              Applied AI · Cloud. Schnelle Prototypen, Automatisierungen, OpenCV &amp; RAG.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Verfügbar für neue Rollen &amp; Projekte
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/40">
            <p className="text-sm uppercase tracking-wider text-zinc-500">Standort</p>
            <p className="mt-1 text-xl font-medium text-white">Berlin, Deutschland</p>

            <p className="mt-6 text-sm uppercase tracking-wider text-zinc-500">E-Mail</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}?subject=Anfrage%20über%20Portfolio`}
                className="text-lg text-accent hover:text-blue-300 break-all"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300 transition hover:bg-white/10"
              >
                {copied ? 'Kopiert ✓' : 'Kopieren'}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}?subject=Anfrage%20über%20Portfolio`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                E-Mail schreiben
              </a>
              <a
                href="https://www.linkedin.com/in/evgeny-kvest-978137345/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/SkoofyDoo"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                GitHub
              </a>
              <a
                href="/EvgenyKvest_CV.pdf"
                download
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
              >
                CV ↓
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
