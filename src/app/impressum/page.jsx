import LegalShell, { LegalLink, LegalSection } from '@/components/LegalShell'

export const metadata = {
  title: 'Impressum · Evgeny Kvest',
  description: 'Impressum und Anbieterkennzeichnung – Portfolio Evgeny Kvest, Berlin.',
}

export default function Impressum() {
  return (
    <LegalShell title="Impressum" eyebrow="Rechtliches">
      <LegalSection title="Angaben gemäß § 5 TMG / Anbieter">
        <p className="text-zinc-300">
          Evgeny Kvest
          <br />
          Berlin, Deutschland
        </p>
        <p className="text-sm text-zinc-500">
          Vollständige ladungsfähige Anschrift wird auf Anfrage mitgeteilt (Portfolio ohne
          offenen Online-Shop; private Kontaktaufnahme).
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          E-Mail:{' '}
          <LegalLink href="mailto:evgenykvest@gmail.com">evgenykvest@gmail.com</LegalLink>
        </p>
        <p>
          Website: <LegalLink href="/">Portfolio</LegalLink>
        </p>
        <p>
          LinkedIn:{' '}
          <LegalLink href="https://www.linkedin.com/in/evgeny-kvest-978137345/">
            linkedin.com/in/evgeny-kvest-978137345
          </LegalLink>
        </p>
        <p>
          GitHub:{' '}
          <LegalLink href="https://github.com/SkoofyDoo">github.com/SkoofyDoo</LegalLink>
        </p>
      </LegalSection>

      <LegalSection title="Beruf">
        <p>
          Fachinformatiker für Anwendungsentwicklung (FIAE). Portfolio zur Präsentation von
          Projekten und Fähigkeiten als Fullstack Developer (Python &amp; JavaScript, Computer
          Vision, Applied AI).
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt">
        <p>Evgeny Kvest, Berlin – Kontakt siehe oben.</p>
      </LegalSection>

      <LegalSection title="Haftung für Inhalte">
        <p>
          Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte wird keine Gewähr übernommen. Als
          Diensteanbieter bin ich gemäß den allgemeinen Gesetzen für eigene Inhalte
          verantwortlich.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <p>
          Diese Website verlinkt auf externe Angebote (z.&nbsp;B. GitHub, LinkedIn, Projekt-Demos
          wie dallio.de, widerspruch.jetzt / Railway, SharpEye). Auf die Inhalte und
          Datenschutzpraktiken verlinkter Seiten habe ich keinen Einfluss. Für den Inhalt der
          verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Texte, Gestaltung und Code dieses Portfolios unterliegen dem Urheberrecht. Beiträge
          Dritter sind als solche gekennzeichnet. Vervielfältigung oder Verwendung außerhalb der
          Grenzen des Urheberrechts bedarf der Zustimmung des jeweiligen Rechteinhabers.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
