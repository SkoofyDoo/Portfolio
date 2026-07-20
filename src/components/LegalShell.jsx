import Footer from '@/components/Footer'

export default function LegalShell({ title, eyebrow, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="section-shell flex items-center justify-between py-5">
          <a
            href="/"
            className="text-sm font-semibold tracking-wide text-white transition hover:text-accent"
          >
            Evgeny Kvest
          </a>
          <nav className="flex items-center gap-5 text-sm text-zinc-400">
            <a href="/impressum" className="transition hover:text-white">
              Impressum
            </a>
            <a href="/datenschutz" className="transition hover:text-white">
              Datenschutz
            </a>
            <a
              href="/"
              className="rounded-full border border-white/15 px-3 py-1 text-zinc-300 transition hover:border-white/30 hover:text-white"
            >
              ← Portfolio
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-14 md:py-20">
        <div className="section-shell max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="mb-10 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          <div className="legal-prose space-y-8 text-[15px] leading-relaxed text-zinc-400">
            {children}
          </div>
          <div className="mt-14 border-t border-white/5 pt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-blue-300"
            >
              ← Zurück zur Startseite
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <div className="space-y-3 text-zinc-400">{children}</div>
    </section>
  )
}

export function LegalLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-accent underline-offset-2 transition hover:text-blue-300 hover:underline"
      {...(href.startsWith('http')
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {children}
    </a>
  )
}
