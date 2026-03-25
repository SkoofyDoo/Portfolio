'use client'
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
        <SpeedInsights />
            <HeroScene flyToBerlin={flyToBerlin}/>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="font-serif font-extrabold tracking-widest text-3xl md:text-5xl text-center text-white">Evgeny Kvest</h1>
                <h2 className="font-serif font-bold tracking-widest text-lg md:text-2xl text-2xl text-center text-white">Fachinformatiker für Anwendungsentwicklung</h2>
                {/* <p className="text-gray-300 text-md">Hallo, ich heisse Evgeny Kvest...</p> */}
                <div className="px-8 py-4">
                    {/* <Button color="error">Projekte</Button>
                    <Button onClick={handleContact} color="inherit">Kontakt</Button> */}
                </div>
            </div>
        </div>

        {/* Projects & About */}
        <div className="relative backdrop-blur-md bg-white/5 border-t border-white/10">
          <Projects/>
          <About/>
          <Contact/>
        </div>

        

    </div>
)
}

