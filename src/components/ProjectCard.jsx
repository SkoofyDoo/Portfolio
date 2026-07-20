'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

function MetricTiles({ metrics, compact }) {
  const items = compact ? metrics.slice(0, 4) : metrics
  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-2'}`}>
      {items.map((m) => (
        <div
          key={m}
          className="rounded-lg border border-white/10 bg-black/35 px-3 py-2.5 backdrop-blur-sm"
        >
          <p className="text-xs leading-snug text-zinc-200 md:text-[13px]">{m}</p>
        </div>
      ))}
    </div>
  )
}

function FlowSteps({ flow }) {
  if (!flow?.length) return null
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5">
      {flow.map((step, i) => (
        <span key={step} className="flex items-center gap-1.5">
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-zinc-300">
            {step}
          </span>
          {i < flow.length - 1 && (
            <span className="text-zinc-600" aria-hidden>
              →
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

function ProjectVisual({ project, featured }) {
  const isPraxis = project.kind === 'praxis'

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950 ${
        featured ? 'aspect-[16/10] md:min-h-[280px] md:aspect-[16/11]' : 'min-h-[200px] aspect-[16/10]'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between p-5 pt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip border-white/15 bg-black/40 text-white/85">
            {project.previewLabel}
          </span>
          {isPraxis && (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200/90">
              Praxisprojekt
            </span>
          )}
          {project.kind === 'product' && (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-200/90">
              {project.href?.includes('http') && !project.href.includes('github')
                ? 'Live'
                : 'Open / Public'}
            </span>
          )}
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isPraxis ? 'Ergebnis · Fakten' : 'Highlights'}
          </p>
          <MetricTiles metrics={project.metrics} compact={!featured} />
          {featured && <FlowSteps flow={project.flow} />}
        </div>
      </div>
    </div>
  )
}

function ProjectLinks({ project, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-blue-300"
      >
        {project.label}
        <span aria-hidden>→</span>
      </a>
      {project.secondaryHref && (
        <a
          href={project.secondaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          {project.secondaryLabel || 'GitHub'} →
        </a>
      )}
    </div>
  )
}

export function FeaturedProject({ project, index }) {
  const reverse = index % 2 === 1
  const isPraxis = project.kind === 'praxis'

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.05 }}
      viewport={{ once: true, margin: '-80px' }}
      className="grid items-center gap-8 lg:gap-12 md:grid-cols-2"
    >
      <div className={`group relative ${reverse ? 'md:order-2' : ''}`}>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
        <div className="relative transition duration-500 md:group-hover:scale-[1.02] md:group-hover:-translate-y-1">
          <ProjectVisual project={project} featured />
        </div>
      </div>

      <div className={reverse ? 'md:order-1' : ''}>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Featured · {project.role}
        </p>
        <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
        <p className="mt-1 text-zinc-400">{project.subtitle}</p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed md:text-base">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Use Case
            </p>
            <p className="text-zinc-300">{project.useCase || project.problem}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Ergebnis
            </p>
            <p className="text-zinc-300">{project.result || project.solution}</p>
          </div>
          {project.architecture?.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Architektur
              </p>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {project.architecture.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        {isPraxis && (
          <p className="mt-4 text-xs text-zinc-500">
            Praxisprojekt · Code nicht vollständig öffentlich · Architektur &amp; Fakten auf GitHub
          </p>
        )}

        <ProjectLinks project={project} className="mt-5" />
      </div>
    </motion.article>
  )
}

export function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const isPraxis = project.kind === 'praxis'

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-xl shadow-black/20 transition hover:border-white/20 hover:shadow-blue-500/10"
    >
      <ProjectVisual project={project} />
      <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-1 text-sm text-zinc-500">{project.subtitle}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.result || project.solution}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
      {isPraxis && (
        <p className="mt-3 text-[11px] text-zinc-500">Praxis · Architektur &amp; Fakten</p>
      )}
      <ProjectLinks project={project} className="mt-3" />
    </motion.article>
  )
}
