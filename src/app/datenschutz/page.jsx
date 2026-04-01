export default function Datenschutz(){
    return (
        <div className="min-h-screen bg-black text-white p-20 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-10">Datenschutzerklärung</h1>
            <h2 className="text-xl font-bold mb-4">Verantwortlicher</h2>
            <p className="text-gray-300 mb-8">
            Evgeny Kvest<br/>
            Berlin, Deutschland<br/>
            E-Mail: evgenykvest@gmail.com
            </p>

            <h2 className="text-xl font-bold mb-4">2. Erhebung von Daten</h2>
            <p className="text-gray-300 mb-8">
                Diese Webseite erhebt keine personenbezogenen Daten. Es werden keine Cookies gesetzt,
                keine Tracking-Tools verwendet und keine Formulardaten gerspeichert.  
            </p> 

            <h2 className="text-xl font-bold mb-4">3. Hosting</h2>
            <p className="text-gray-300 mb-8">
                Diese Webseite wird über Vercel Inc. gehostet. Vercel kann beim Aufruf der Seite 
                technische Daten wie IP-Adressen in Server-Logs speichern.
                Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy"className="text-blue-400 hover:text-blue-300">vercel.com/legal/privacy-policy</a> 
            </p> 
            <h2 className="text-xl font-bold mb-4">4. Externe Links</h2>
            <p className="text-gray-300 mb-8">
                Diese Webseite enthält Links zu GitHub und LinkedIn.
                Für die Datenschutzpraktiken dieser Dienste sind deren eigene Datenschutzrichtlinien maßgeblich.
            </p> 
            <h2 className="text-xl font-bold mb-4">5. Rechte der Nutzer</h2>
            <p className="text-gray-300 mb-8">
                Da keine personenbezogenen Daten erhoben werden, bestehen keine Auskunfts-, 
                Löschungs- oder Widerspruchsrechte im Sinne der DSGVO.
            </p>

            <a href="/" className="text-blue-400 hover:text-blue-300">🔙 Zurück zur Startseite</a> 
        </div>
    )
}