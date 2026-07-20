'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB
const easeOut = [0.22, 1, 0.36, 1]

/** Laplacian variance – classic blur heuristic (client-side, no backend). */
function laplacianVariance(imageData) {
  const { data, width, height } = imageData
  const gray = new Float32Array(width * height)
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
  }

  let sum = 0
  let sumSq = 0
  let n = 0
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x
      const lap =
        -4 * gray[i] +
        gray[i - 1] +
        gray[i + 1] +
        gray[i - width] +
        gray[i + width]
      sum += lap
      sumSq += lap * lap
      n++
    }
  }
  if (!n) return 0
  const mean = sum / n
  return sumSq / n - mean * mean
}

function verdictFromScore(score) {
  if (score > 120) {
    return {
      label: 'PASS · scharf genug',
      tone: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    }
  }
  if (score > 50) {
    return {
      label: 'BORDERLINE · prüfen',
      tone: 'text-amber-200 border-amber-500/30 bg-amber-500/10',
    }
  }
  return {
    label: 'FAIL · unscharf',
    tone: 'text-red-300 border-red-500/30 bg-red-500/10',
  }
}

export default function VisionDemo() {
  const inputRef = useRef(null)
  const objectUrlRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [score, setScore] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const revokePreview = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }, [])

  useEffect(() => () => revokePreview(), [revokePreview])

  const analyzeFile = useCallback(
    (file) => {
      setError(null)
      if (!file) return
      if (!file.type.startsWith('image/')) {
        setError('Bitte eine Bilddatei wählen (JPEG, PNG, WebP…).')
        return
      }
      if (file.size > MAX_FILE_BYTES) {
        setError('Datei zu groß (max. 10 MB) — bitte ein kleineres Bild wählen.')
        return
      }

      setBusy(true)
      revokePreview()
      const url = URL.createObjectURL(file)
      objectUrlRef.current = url
      setPreview(url)

      const img = new Image()
      img.onload = () => {
        try {
          const max = 480
          const scale = Math.min(1, max / Math.max(img.width, img.height))
          const w = Math.max(2, Math.round(img.width * scale))
          const h = Math.max(2, Math.round(img.height * scale))
          const canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          if (!ctx) {
            setError('Canvas nicht verfügbar.')
            setBusy(false)
            return
          }
          ctx.drawImage(img, 0, 0, w, h)
          const imageData = ctx.getImageData(0, 0, w, h)
          setScore(laplacianVariance(imageData))
        } catch {
          setError('Analyse fehlgeschlagen.')
          setScore(null)
        }
        setBusy(false)
      }
      img.onerror = () => {
        setError('Bild konnte nicht geladen werden.')
        setBusy(false)
      }
      img.src = url
    },
    [revokePreview]
  )

  const onDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) analyzeFile(file)
  }

  const v = score != null ? verdictFromScore(score) : null

  return (
    <section
      id="vision-demo"
      className="scroll-mt-28 border-b border-white/5 py-16 md:py-20"
    >
      <div className="section-shell">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Live skill · Computer Vision
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Schärfe messen — im Browser
          </h2>
          <p className="mt-4 text-zinc-400 md:text-lg">
            Kein Backend. Kein Upload-Server. Laplacian-Varianz auf dem Client — so denke ich
            Qualität in Media-Pipelines (SharpEye, Schärfe-Analyse, Frame-QC).
          </p>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            viewport={{ once: true }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-zinc-900/50 p-8 text-center transition-colors hover:border-accent/40"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Analyse-Vorschau"
                className="mb-4 max-h-48 rounded-lg object-contain"
              />
            ) : (
              <div className="mb-4 text-4xl opacity-40">◎</div>
            )}
            <p className="text-sm text-zinc-400">Bild hierher ziehen oder auswählen</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Bild wählen
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) analyzeFile(f)
                e.target.value = ''
              }}
            />
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            <p className="mt-3 text-[11px] text-zinc-600">
              Lokal im Browser · max. 10 MB · keine Server-Speicherung
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
            viewport={{ once: true }}
            className="flex flex-col justify-center rounded-2xl border border-white/10 bg-zinc-900/80 p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Ergebnis
            </p>
            {busy && <p className="mt-4 text-zinc-400">Analysiere…</p>}
            {!busy && score == null && !error && (
              <p className="mt-4 text-zinc-500">
                Noch kein Bild — nach der Analyse siehst du Score + Verdict wie in einer
                QC-Pipeline.
              </p>
            )}
            {!busy && score != null && v && (
              <>
                <p className="mt-4 font-mono text-4xl font-semibold tabular-nums text-white">
                  {score.toFixed(1)}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Laplacian variance (höher = schärfer)
                </p>
                <span
                  className={`mt-5 inline-flex w-fit rounded-full border px-3 py-1 text-sm font-medium ${v.tone}`}
                >
                  {v.label}
                </span>
                <p className="mt-6 text-sm leading-relaxed text-zinc-400">
                  In Produktion: Thresholds pro Use Case (Dataset / Telemedizin), Batch-CLI,
                  Reports — siehe SharpEye. Hier nur der Kern-Gedanke, live spürbar.
                </p>
              </>
            )}
            <a
              href="https://github.com/SkoofyDoo/sharpeye"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 text-sm font-medium text-accent transition-colors hover:text-blue-300"
            >
              SharpEye auf GitHub →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
