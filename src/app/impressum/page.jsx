export default function Impressum() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 md:p-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-3xl font-bold">Impressum</h1>
        <p className="text-gray-300">Evgeny Kvest</p>
        <p className="text-gray-300">Berlin, Deutschland</p>
        <p className="mb-8 text-gray-300">
          <a href="mailto:evgenykvest@gmail.com" className="text-blue-400 hover:text-blue-300">
            evgenykvest@gmail.com
          </a>
        </p>
        <a href="/" className="text-blue-400 hover:text-blue-300">
          ← Zurück zur Startseite
        </a>
      </div>
    </div>
  )
}
