export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 py-8 text-center text-sm text-zinc-500">
      <div className="section-shell flex flex-col items-center justify-between gap-4 md:flex-row md:text-left">
        <p>© 2026 Evgeny Kvest · Fullstack Developer</p>
        <div className="flex gap-6">
          <a href="/impressum" className="transition hover:text-white">
            Impressum
          </a>
          <a href="/datenschutz" className="transition hover:text-white">
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  )
}
