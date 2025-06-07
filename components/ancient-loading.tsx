"use client"

import { useEffect, useState } from "react"

interface AncientLoadingProps {
  dictionary: any
}

export default function AncientLoading({ dictionary }: AncientLoadingProps) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (soundEnabled && mounted) {
      const audio = new Audio("/sounds/tach-tach-tach.mp3")
      audio.loop = true
      audio.volume = 0.45
      audio.play().catch(() => {
        setSoundEnabled(false)
      })

      return () => {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [soundEnabled, mounted])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="ancient-orb w-40 h-40 rounded-full mx-auto flex items-center justify-center">
            <div className="text-6xl">☯️</div>
          </div>
          <div className="absolute inset-0 w-40 h-40 border-4 border-amber-600 rounded-full mx-auto animate-spin opacity-30"></div>
        </div>

        <h2 className="calligraphy-font text-4xl text-amber-800 mb-4 ancient-text-glow">{dictionary.form.loading}</h2>

        <div className="flex justify-center space-x-4 mb-4">
          {["🏮", "🐉", "🌸", "☯️", "🔮"].map((symbol, i) => (
            <div key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
              {symbol}
            </div>
          ))}
        </div>

        <p className="ancient-font text-amber-700 text-lg">{dictionary.form.loadingSub}</p>
      </div>
    </div>
  )
}
