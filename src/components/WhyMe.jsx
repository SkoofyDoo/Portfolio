'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'Shipper',
    text: 'Eigene Produkte und Demos live (Dallio, widerspruch.jetzt) – nicht nur Tutorials.',
  },
  {
    title: 'Pipeline-Denken',
    text: '3D, Video, OpenCV, Headless Rendering – Systeme, nicht isolierte Features.',
  },
  {
    title: 'Schnelle Prototypen',
    text: 'Ideen validieren, automatisieren, deployen – mit Fokus auf wartbaren Code.',
  },
  {
    title: 'Ehrlich junior',
    text: 'Stark dort, wo Projekte beweisen. Klar im Aufbau: LangChain, ML, Docker.',
  },
]

export default function WhyMe() {
  return (
    <section className="border-b border-white/5 py-16 md:py-20">
      <div className="section-shell">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              In 30 Sekunden
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Warum ich als Junior zähle
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              <p>
                Ich bin kein «alles und nichts»-Junior. Ich{' '}
                <span className="text-zinc-200">shippe End-to-End</span> (Dallio,
                widerspruch.jetzt), denke in{' '}
                <span className="text-zinc-200">Pipelines</span> (3D / Video / OpenCV) und
                lerne Applied AI <span className="text-zinc-200">an echten Produkten</span>
                , nicht nur in Kursen.
              </p>
              <p>
                Noch nicht überall deep — aber{' '}
                <span className="text-zinc-200">
                  schnell, strukturiert und produktorientiert
                </span>
                . Genau das braucht ein Team auf Junior-Level: jemand, der anpackt, liefert
                und mitwächst.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                Praktikum · MedTech
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                Eigenes Produkt · Dallio
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                RAG live · widerspruch.jetzt
              </span>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5"
              >
                <h3 className="text-sm font-semibold text-accent">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
