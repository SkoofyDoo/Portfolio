'use client'

import { projects } from '@/data/projects'
import { FeaturedProject, ProjectCard } from './ProjectCard'

/** Live demos (product URL, not only GitHub) rank highest */
function isLiveDemo(p) {
  return Boolean(p.href && !String(p.href).includes('github.com'))
}

function byLiveFirst(a, b) {
  return Number(isLiveDemo(b)) - Number(isLiveDemo(a))
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured).sort(byLiveFirst)
  const secondary = projects.filter((p) => !p.featured).sort(byLiveFirst)

  return (
    <section id="projekte" className="scroll-mt-28 py-24 md:py-28">
      <div className="section-shell">
        <div className="mb-14 text-center md:text-left">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Selected Work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Projekte, die Technik beweisen
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400 md:text-lg">
            Live-Produkte, Applied RAG und Praxis-Pipelines — Use Case, Architektur und Ergebnis in Zahlen.
          </p>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {featured.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-20">
          <h3 className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Weitere Systeme
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
            {secondary.map((project, index) => (
              <div key={project.id} className="min-w-0 max-w-full">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
