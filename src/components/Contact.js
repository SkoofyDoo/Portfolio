import {motion} from 'framer-motion'

export default function Contact(){

    const contact = [
        { 
            city: 'Berlin, Deutschland',
            email: 'evgenykvest@gmail.com',
            linkedIn: 'https://www.linkedin.com/in/evgeny-kvest-978137345/',
            github: 'https://github.com/SkoofyDoo', 
        },   
    ]

    return (
        <section className="py-20 px-10 bg-zinc-900">
        <h2 className="text-white text-3xl font-bold mb-10">Kontakt</h2>
        <div className="grid grid-cols-1 max-w-md gap-6">
            {contact.map((contact, index) => (
                <motion.div key={index} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: index * 0.15}} className="bg-zinc-900 rounded-xl p-6">
                    <h3 className="text-white text-xl font-bold mb-3">{contact.city}</h3>
                    <p className="text-gray-400">{contact.email}</p>
                    <p className="text-gray-400">Telefonnummer: 0159 06454927</p>
                    <div className="grid grid-cols-1">
                        <a className="text-blue-400 hover:text-blue-300" href={contact.linkedIn}>LinkedIn</a>
                        <a className="text-blue-400 hover:text-blue-300" href={contact.github}>GitHub</a>
                    </div>
                    
                </motion.div>
            ))}
        </div>
    </section>
    )
}