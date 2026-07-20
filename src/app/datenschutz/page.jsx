export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 md:p-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-3xl font-bold">Datenschutzerklärung</h1>

        <h2 className="mb-4 text-xl font-bold">1. Verantwortlicher</h2>
        <p className="mb-8 text-gray-300">
          Evgeny Kvest
          <br />
          Berlin, Deutschland
          <br />
          E-Mail: evgenykvest@gmail.com
        </p>

        <h2 className="mb-4 text-xl font-bold">2. Erhebung von Daten</h2>
        <p className="mb-8 text-gray-300">
          Diese Website erhebt keine personenbezogenen Daten über eigene Formulare und setzt
          keine Marketing-Cookies. Beim Besuch können technische Daten (z.&nbsp;B. IP-Adresse,
          Browser-Typ, Zeitstempel) durch den Hosting-Anbieter und integrierte Analyse-Dienste
          verarbeitet werden.
        </p>

        <h2 className="mb-4 text-xl font-bold">3. Hosting</h2>
        <p className="mb-8 text-gray-300">
          Diese Website wird über Vercel Inc. gehostet. Vercel kann beim Aufruf der Seite
          technische Daten wie IP-Adressen in Server-Logs speichern. Weitere Informationen:{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel.com/legal/privacy-policy
          </a>
        </p>

        <h2 className="mb-4 text-xl font-bold">4. Analyse (Vercel Analytics &amp; Speed Insights)</h2>
        <p className="mb-8 text-gray-300">
          Zur Verbesserung der Website-Performance und des Nutzungsverhaltens sind{' '}
          <strong>Vercel Analytics</strong> und <strong>Vercel Speed Insights</strong>{' '}
          eingebunden. Diese Dienste erfassen anonymisierte bzw. pseudonymisierte Nutzungs- und
          Performance-Metriken. Es werden keine klassischen Werbe-Cookies zu Tracking-Zwecken
          gesetzt. Details:{' '}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Analytics Privacy
          </a>
          .
        </p>

        <h2 className="mb-4 text-xl font-bold">5. Externe Links</h2>
        <p className="mb-8 text-gray-300">
          Diese Website enthält Links zu GitHub, LinkedIn und ggf. weiteren Projekten (z.&nbsp;B.
          dallio.de). Für die Datenschutzpraktiken dieser Dienste sind deren eigene
          Datenschutzrichtlinien maßgeblich.
        </p>

        <h2 className="mb-4 text-xl font-bold">6. Rechte der Nutzer</h2>
        <p className="mb-8 text-gray-300">
          Soweit personenbezogene Daten verarbeitet werden, stehen Ihnen unter der DSGVO
          Auskunfts-, Berichtigungs-, Löschungs- und Widerspruchsrechte zu. Anfragen richten Sie
          bitte an die oben genannte E-Mail-Adresse.
        </p>

        <a href="/" className="text-blue-400 hover:text-blue-300">
          ← Zurück zur Startseite
        </a>
      </div>
    </div>
  )
}
