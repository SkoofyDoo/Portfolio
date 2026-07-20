'use client'

import { motion } from 'framer-motion'
import { aboutText, skillGroups, softSkills, roleFit } from '@/data/skills'

export default function About() {
  const groups = Object.values(skillGroups)

  return (
    <section id="ueber-mich" className="scroll-mt-28 border-t border-white/5 py-24 md:py-28">
      <div className="section-shell">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Über mich
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {'Web. Pipelines. Vision.'}
            </h2>
            <p className="mt-5 text-lg text-white/90">{aboutText.lead}</p>
            <p className="mt-4 leading-relaxed text-zinc-400">{aboutText.body}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {aboutText.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-zinc-200"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Role fit for recruiters */}
            <div className="mt-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Passend für Rollen
              </p>
              <div className="flex flex-wrap gap-2">
                {roleFit.map((item) => (
                  <span
                    key={item.role}
                    title={item.proof}
                    className="group relative cursor-default rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-accent/40 hover:text-white"
                  >
                    {item.role}
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-48 -translate-x-1/2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 shadow-xl group-hover:block">
                      {item.proof}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {groups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`rounded-2xl border p-5 ${
                  group.highlight
                    ? 'border-accent/25 bg-zinc-900/90 sm:col-span-2'
                    : group.muted
                      ? 'border-white/5 bg-zinc-900/40 sm:col-span-2'
                      : 'border-white/10 bg-zinc-900/70 sm:col-span-2'
                }`}
              >
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider ${
                      group.highlight
                        ? 'text-accent'
                        : group.muted
                          ? 'text-zinc-500'
                          : 'text-zinc-400'
                    }`}
                  >
                    {group.title}
                  </h3>
                  {group.subtitle && (
                    <span className="text-[11px] text-zinc-600">{group.subtitle}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={
                        group.highlight
                          ? 'rounded-full border border-accent/25 bg-accent/15 px-3 py-1 text-sm font-medium text-blue-200'
                          : group.muted
                            ? 'rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-sm text-zinc-500'
                            : 'chip'
                      }
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft skills / Arbeitsweise */}
        <div className="mt-20 border-t border-white/5 pt-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Arbeitsweise &amp; Stärken
          </p>
          <h3 className="mb-8 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Wie ich arbeite – und was das für Teams bedeutet
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {softSkills.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
              >
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
