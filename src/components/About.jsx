import {motion} from 'framer-motion'

export default function About() {
    const about = [
        {
            text: 'Ich bin Evgeny Kvest, Fachinformatiker für Anwendungsentwicklung aus Berlin. Ich entwickle professionell Webanwendungen mit Fokus auf JavaScript, Node.js und AWS. Ich kombiniere solides Backend-Know-How mit modernen Frontend-Technologien - und bringe dabei auch 3D-Visualisierungen ins Web',
            skills: [
                { 
                    Backend: ['Node.js', 'Express', 'REST APIs', 'Puppeteer']
                },
                {
                    Frontend: ['JavaScript', 'React', 'Next.js', 'Three.js', 'OpenCV.WASM']
                },
                {
                    Cloud: ['EC2', 'S3', 'Lambda', 'Bedrock', 'DynamoDB', 'Cognito', 'WebDav']
                },
                {
                    DB: ['SQL', 'NoSQL']
                },
                {
                    Tools: ['Git', 'GitHub Actions']
                },
        ],

    }
]
    return (
        <section className="py-20 px-10 md:px-10">
            <h2 className="text-white text-3xl text-center font-bold mb-10">Über mich</h2>
            <p className="text-gray-300 text-sm md:text-base mb-10">{about[0].text}</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {about[0].skills.map((skillGroup, index) => {
                    const [category, items] = Object.entries(skillGroup)[0]
                    return (
                        <motion.div key={index} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: index * 0.15}} viewport={{ once: true }} className="bg-zinc-900 rounded-xl p-4 ">
                            <h3 className="text-center text-white font-bold text-sm md:text-base mb-2 ">{category}</h3>
                            {items.map((skill, i) => (
                                <span key={i} className="border mb-2 flex flex-col justify-between bg-zinc-700 text-gray-300 text-sm md:text-base px-2 py-1 rounded mr-1">{skill}</span>
                            ))}
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )

}