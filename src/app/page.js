'use client'
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button'
import {useState} from 'react'

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false
})

const Projects = dynamic(() => import('@/components/Projects'))

const About = dynamic(() => import('@/components/About'))

const Contact = dynamic(() => import('@/components/Contact'))

export default function Home() {

  const [flyToBerlin, setFlyToBerlin] = useState(false)

  const handleContact = () => {
    setFlyToBerlin(true)
    setTimeout(() => setFlyToBerlin(false), 5000)
  }

  return (
    <div className="font-serif font-bold tracking-wider dark:bg-black">
        
        {/* Hero */}
        <div className="relative h-screen">
            <HeroScene flyToBerlin={flyToBerlin}/>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="font-serif font-extrabold tracking-widest text-5xl text-white">Evgeny Kvest</h1>
                <h2 className="font-serif font-bold tracking-widest text-2xl text-white">Fachinformatiker für Anwendungsentwicklung</h2>
                <p className="text-gray-300 text-md">Hallo, ich heisse Evgeny Kvest...</p>
                <div className="px-8 py-4 shadow-lg">
                    <Button color="error">Projekte</Button>
                    <Button onClick={handleContact} color="inherit">Kontakt</Button>
                </div>
            </div>
        </div>

        {/* Projects & About */}
        <div className="relative backdrop-blur-md bg-white/5 border-t border-white/10">
          <Projects/>
          <About/>
          <Contact/>
        </div>
        {/* {flyToBerlin && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
              backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-white text-sm
              pointer-events-none">
              <p className="font-bold mb-2">📍 Berlin, Deutschland</p>
              <p>✉️ evgenykvest@gmail.com</p>
              <a href="https://github.com/SkoofyDoo" 
                className="text-blue-400 pointer-events-auto">GitHub</a>
              <br/>
              <a href="https://www.linkedin.com/in/evgeny-kvest-978137345/" 
                className="text-blue-400 pointer-events-auto">LinkedIn</a>
          </div>
          )
        } */}
        

    </div>
)
}

