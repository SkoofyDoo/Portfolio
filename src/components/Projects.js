import {motion} from 'framer-motion'

export default function Projects() {
    const projects = [
        {
            title: '3D-Vorschau-Pipeline — Headless Rendering & Modellschutz',
            stack: ['Node.js ',  'Express ', 'Nextcloud WebDAV ','Puppeteer ', 'SSE ', 'Three.js ', 'DynamoDB ', 'Cognito', 'Amplify'],
            description: 'Serverseitige Pipeline zur automatisierten Vorschaugenerierung von 3D-Medizinscans. Puppeteer startet einen headless Chromium-Prozess, der Three.js mit WebGL2 ausführt und 12 Kameraansichten rendert – texturiert und als Wireframe.',
            github: 'https://github.com/SkoofyDoo/3D-Vorschau-Pipeline-Headless-Rendering-Approval-Workflow',
            label: 'GitHub'
        },
        {
            title: 'Dallio',
            stack: ['EC2 ', 'S3 ', 'Lambda ', 'Bedrock ', 'DynamoDB ', 'Cognito', 'Amplify'],
            description: 'Der Smart Document Analyzer ist ein intelligenter persönlicher Assistent für die deutsche Bürokratie. Die Anwendung hilft Benutzern, ihre Dokumente (Rechnungen, Behördenbriefe) zu digitalisieren, Finanzen zu tracken und automatisch Termine aus Briefen zu extrahieren.',
            github: 'https://dallio.de',
            label: 'Dallio.de'
        },
        { 
            title: 'Client-Based-VideoSlicer',
            stack: ['JavaScript ', 'React '],
            description: 'Ein React-Komponente zur automatischen Extraktion von Einzelbildern (Frames) aus Videodateien – vollständig im Browser, ohne Backend oder externe Bibliotheken.',
            github: 'https://github.com/SkoofyDoo/Client-Based-VideoSlicer',
            label: 'GitHub'
    
        },
        {
            title: 'Automatisierte-Schaerfe-Analyse',
            stack: ['Node.js ', 'OpenCV.WASM ', 'Sharp ', 'archiver '],
            description: 'Ein Node.js-Modul zur automatischen Schärfebewertung und Filterung von Video-Frames auf dem Server. Unscharfe Bilder werden aussortiert, die besten Frames als ZIP archiviert.',
            github: 'https://github.com/SkoofyDoo/Automatisierte-Schaerfe-Analyse',
            label: 'GitHub'
        },
        
    
    ]

    return (
        <section className="py-20 px-10">
            <h2 className="text-white text-center text-3xl font-bold mb-10">Projekte</h2>
            <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {projects.map((project, index) => (
                    <motion.div key={index} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: index * 0.15}} className="bg-zinc-900 rounded-xl p-6  hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                        <h3 className="text-white text-xl font-bold mb-3 ">{project.title}</h3>
                        <p className="text-gray-400">{project.description}</p>
                        <div className='flex flex-wrap gap-2 mt-4'>
                            {project.stack.map((tech, i) => (
                                <span className="bg-zinc-700 text-gray-300 border text-l px-2 py-1 rounded mr-1" key={i}>{tech}</span>
                            ))}
                        </div>
                        <a className="text-blue-400 hover:text-blue-300 mt-4 block" href={project.github}>{project.label || 'GitHub'}</a>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
