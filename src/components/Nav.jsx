'use client'

import { useEffect, useState } from 'react'

const links = [
  { id: 'projekte', label: 'Projekte' },
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'kontakt', label: 'Kontakt' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.55)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 hidden md:block transition-all duration-300 ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <nav className="mx-auto mt-4 max-w-6xl px-6">
        <div className="glass flex items-center justify-between rounded-full px-6 py-3 shadow-lg shadow-black/40">
          <a
            href="#top"
            className="text-sm font-semibold tracking-wide text-white hover:text-accent transition-colors"
          >
            Evgeny Kvest
          </a>
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active === link.id
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/EvgenyKvest_CV.pdf"
                download
                className="ml-2 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white hover:bg-white/10 transition-colors"
              >
                CV ↓
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
