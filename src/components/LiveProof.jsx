'use client'

import { motion } from 'framer-motion'

/** Live demos first — highest priority for recruiters */
const lives = [
  {
    badge: 'LIVE',
    title: 'widerspruch.jetzt',
    blurb: 'RAG-Produkt: formelle Widersprüche aus SGB II/X – End-to-End deployed.',
    href: 'https://sgb2-rag-production.up.railway.app/ui/',
    cta: 'Demo öffnen',
    accent: 'border-cyan-500/30 bg-cyan-500/5',
  },
  {
    badge: 'LIVE',
    title: 'Dallio',
    blurb: 'Eigenes Produkt: Dokumente, Finanzen & Termine – AWS + Bedrock.',
    href: 'https://dallio.de',
    cta: 'dallio.de',
    accent: 'border-violet-500/30 bg-violet-500/5',
  },
  {
    badge: 'LIVE',
    title: 'MindGuard',
    blurb:
      'Privacy-first Mood-Demo: Video-Frames & Pipeline-Visualisierung – 100% im Browser.',
    href: 'https://mind-guard-five.vercel.app',
    cta: 'Live Demo',
    accent: 'border-rose-500/30 bg-rose-500/5',
  },
  {
    badge: 'OPEN',
    title: 'SharpEye',
    blurb: 'Image-QC Library: Verdicts, CLI, API & Agent-Schema – nicht nur Scores.',
    href: 'https://github.com/SkoofyDoo/sharpeye',
    cta: 'GitHub',
    accent: 'border-amber-500/30 bg-amber-500/5',
  },
]

export default function LiveProof() {
  return (
    <section className="border-b border-white/5 py-14 md:py-16">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Sofort prüfbar
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Nicht nur Folien — laufende Systeme
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-500 md:text-right">
            Live-Demos zuerst. Ein starker Junior liefert Beweis, nicht Versprechen.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lives.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`group rounded-2xl border p-5 transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 ${item.accent}`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    item.badge === 'LIVE'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-white/15 bg-white/5 text-zinc-400'
                  }`}
                >
                  {item.badge === 'LIVE' && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  )}
                  {item.badge}
                </span>
                <span className="shrink-0 text-xs text-zinc-500 transition group-hover:text-accent">
                  {item.cta} →
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.blurb}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
