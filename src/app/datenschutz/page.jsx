import LegalShell, { LegalLink, LegalSection } from '@/components/LegalShell'

export const metadata = {
  title: 'Datenschutz · Evgeny Kvest',
  description:
    'Datenschutzerklärung zum Portfolio von Evgeny Kvest – Hosting, Analytics, externe Links und lokale Demos.',
}

export default function Datenschutz() {
  return (
    <LegalShell title="Datenschutzerklärung" eyebrow="Datenschutz · DSGVO">
      <LegalSection title="1. Verantwortlicher">
        <p className="text-zinc-300">
          Evgeny Kvest
          <br />
          Berlin, Deutschland
          <br />
          E-Mail:{' '}
          <LegalLink href="mailto:evgenykvest@gmail.com">evgenykvest@gmail.com</LegalLink>
        </p>
      </LegalSection>

      <LegalSection title="2. Zweck dieser Website">
        <p>
          Diese Website ist ein persönliches Entwickler-Portfolio. Sie präsentiert Projekte
          (u.&nbsp;a. widerspruch.jetzt, Dallio, SharpEye, 3D- und Media-Pipelines), Skills und
          Kontaktmöglichkeiten. Es gibt kein Benutzerkonto und kein eigenes Kontaktformular mit
          Server-Speicherung.
        </p>
      </LegalSection>

      <LegalSection title="3. Welche Daten anfallen">
        <p>
          <strong className="text-zinc-300">Keine eigenen Formulare:</strong> Es werden keine
          personenbezogenen Daten über ein serverseitiges Formular erhoben oder in einer eigenen
          Datenbank gespeichert. E-Mail-Kontakt läuft über{' '}
          <LegalLink href="mailto:evgenykvest@gmail.com">mailto:</LegalLink> (Ihr E-Mail-Client /
          Anbieter).
        </p>
        <p>
          <strong className="text-zinc-300">Technische Zugriffsdaten:</strong> Beim Aufruf der
          Seite können durch Hosting und Analyse Dienste technisch notwendige bzw.
          nutzungsbezogene Daten anfallen (z.&nbsp;B. IP-Adresse, Zeitstempel, User-Agent,
          aufgerufene URL, Performance-Metriken).
        </p>
        <p>
          <strong className="text-zinc-300">Zwischenablage (optional):</strong> Die
          «E-Mail kopieren»-Funktion nutzt die Browser-Clipboard-API lokal auf Ihrem Gerät. Es
          werden keine Daten an einen eigenen Server gesendet.
        </p>
      </LegalSection>

      <LegalSection title="4. Hosting (Vercel)">
        <p>
          Die Website wird bei <strong className="text-zinc-300">Vercel Inc.</strong> gehostet.
          Vercel kann in Server-Logs technische Daten (u.&nbsp;a. IP-Adressen) speichern, soweit
          dies zum Betrieb und zur Sicherheit erforderlich ist.
        </p>
        <p>
          Weitere Informationen:{' '}
          <LegalLink href="https://vercel.com/legal/privacy-policy">
            vercel.com/legal/privacy-policy
          </LegalLink>
        </p>
      </LegalSection>

      <LegalSection title="5. Analyse – Vercel Analytics &amp; Speed Insights">
        <p>
          Zur Messung von Reichweite und Ladeperformance sind{' '}
          <strong className="text-zinc-300">Vercel Analytics</strong> und{' '}
          <strong className="text-zinc-300">Vercel Speed Insights</strong> eingebunden. Es werden
          (pseudo-)anonymisierte Nutzungs- und Performance-Metriken verarbeitet. Es handelt sich
          nicht um klassisches Werbe-Tracking mit Marketing-Cookies Dritter.
        </p>
        <p>
          Rechtsgrundlage: berechtigtes Interesse an der stabilen und performanten Darstellung des
          Portfolios (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p>
          Details:{' '}
          <LegalLink href="https://vercel.com/docs/analytics/privacy-policy">
            Vercel Analytics Privacy
          </LegalLink>
        </p>
      </LegalSection>

      <LegalSection title="6. Interaktive Demo (Schärfe-Analyse im Browser)">
        <p>
          Auf der Portfolio-Startseite gibt es eine optionale{' '}
          <strong className="text-zinc-300">Computer-Vision-Demo</strong> (Laplacian-Varianz /
          Schärfe-Schätzung). Gewählte Bilder werden{' '}
          <strong className="text-zinc-300">nur lokal im Browser</strong> verarbeitet. Es findet{' '}
          <strong className="text-zinc-300">kein Upload</strong> auf einen eigenen Server statt.
          Nach dem Schließen der Seite bleiben die Bilddaten nicht bei mir gespeichert.
        </p>
      </LegalSection>

      <LegalSection title="7. 3D-Darstellung &amp; lokale Assets">
        <p>
          Die interaktive 3D-Erde (Three.js) lädt Texturen und Skripte von dieser Website
          (Hosting). Es werden keine Kontodaten dafür benötigt. WebGL läuft im Browser auf Ihrem
          Gerät.
        </p>
      </LegalSection>

      <LegalSection title="8. Externe Links &amp; eingebundene Ziele">
        <p>
          Das Portfolio verlinkt u.&nbsp;a. auf:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <LegalLink href="https://github.com/SkoofyDoo">GitHub</LegalLink> (Code / Architektur)
          </li>
          <li>
            <LegalLink href="https://www.linkedin.com/in/evgeny-kvest-978137345/">
              LinkedIn
            </LegalLink>
          </li>
          <li>
            <LegalLink href="https://dallio.de">dallio.de</LegalLink> (eigenes Produkt)
          </li>
          <li>
            <LegalLink href="https://sgb2-rag-production.up.railway.app/ui/">
              widerspruch.jetzt Live-Demo
            </LegalLink>{' '}
            (Hosting u.&nbsp;a. über Railway / ggf. Hugging Face in der Demo)
          </li>
          <li>
            <LegalLink href="https://mind-guard-five.vercel.app">MindGuard Live-Demo</LegalLink>{' '}
            (Vercel)
          </li>
          <li>Weitere Projektrepos (z.&nbsp;B. SharpEye, Praxis-Pipelines)</li>
        </ul>
        <p>
          Beim Verlassen dieser Website gelten die Datenschutzbestimmungen der jeweiligen
          Anbieter. Ich habe keinen Einfluss auf deren Datenverarbeitung.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies">
        <p>
          Es werden keine eigenen Marketing-Cookies gesetzt. Technisch notwendige Speicherung
          durch den Browser, den Hoster oder Vercel Analytics/Speed Insights kann im Rahmen der
          jeweiligen Dienste anfallen. Details siehe Abschnitte 4 und 5 sowie die
          Datenschutzhinweise von Vercel.
        </p>
      </LegalSection>

      <LegalSection title="10. Speicherdauer">
        <p>
          Eigene serverseitige Speicherung von Bewerber- oder Kontaktdaten findet über diese
          Website nicht statt. Speicherdauern bei Vercel und verlinkten Diensten richten sich nach
          deren jeweiligen Angaben.
        </p>
      </LegalSection>

      <LegalSection title="11. Ihre Rechte">
        <p>
          Soweit personenbezogene Daten verarbeitet werden, stehen Ihnen unter der DSGVO u.&nbsp;a.
          Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit sowie Widerspruch zu. Beschwerden können Sie an die zuständige
          Aufsichtsbehörde richten.
        </p>
        <p>
          Anfragen bitte an:{' '}
          <LegalLink href="mailto:evgenykvest@gmail.com">evgenykvest@gmail.com</LegalLink>
        </p>
      </LegalSection>

      <LegalSection title="12. Stand">
        <p>Stand dieser Erklärung: Juli 2026. Bei wesentlichen Änderungen der Website (z.&nbsp;B.
          neue Analyse-Tools oder Formulare) wird dieser Text aktualisiert.</p>
      </LegalSection>
    </LegalShell>
  )
}
