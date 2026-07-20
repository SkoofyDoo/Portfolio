'use client'

import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { useCallback, useState } from 'react'
import Nav from '@/components/Nav'
import HeroOverlay from '@/components/HeroOverlay'
import Footer from '@/components/Footer'

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
})

const Projects = dynamic(() => import('@/components/Projects'))
const About = dynamic(() => import('@/components/About'))
const Contact = dynamic(() => import('@/components/Contact'))

export default function Home() {
  const [flyToBerlin, setFlyToBerlin] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFly = useCallback(() => {
    setFlyToBerlin((prev) => !prev)
  }, [])

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleProgress = useCallback((value) => {
    setProgress(value)
  }, [])

  return (
    <div id="top" className="bg-background tracking-wide">
      <SpeedInsights />
      <Analytics />
      <Nav />

      {/* Hero */}
      <div className="relative h-screen">
        <HeroScene
          flyToBerlin={flyToBerlin}
          onLoad={handleLoad}
          onProgress={handleProgress}
        />

        {!loaded && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <p className="loading-pulse text-sm tracking-[0.35em] text-white/80 uppercase">
              Loading
            </p>
            <div className="mt-6 h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-zinc-500 tabular-nums">{progress}%</p>
          </div>
        )}

        <HeroOverlay onFlyToBerlin={handleFly} flying={flyToBerlin} />
      </div>

      {/* Content */}
      <div className="relative z-10 border-t border-white/10 bg-zinc-950/90 backdrop-blur-md">
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
