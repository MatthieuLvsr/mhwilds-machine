import { useEffect, useRef } from "react"

interface SoundEffectsProps {
  spinning: boolean
  reelsStopped: boolean[]
  showResult: boolean
}

export default function SoundEffects({ spinning, reelsStopped, showResult }: SoundEffectsProps) {
  const spinSoundRef = useRef<HTMLAudioElement | null>(null)
  const stopSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio elements
    spinSoundRef.current = new Audio("/sounds/spin.mp3")
    stopSoundRef.current = new Audio("/sounds/stop.mp3")
    winSoundRef.current = new Audio("/sounds/win.mp3")

    // Configure audio
    if (spinSoundRef.current) {
      spinSoundRef.current.loop = true
      spinSoundRef.current.volume = 0.5
    }

    return () => {
      // Cleanup
      spinSoundRef.current?.pause()
      stopSoundRef.current?.pause()
      winSoundRef.current?.pause()
    }
  }, [])

  // Handle spin sound
  useEffect(() => {
    if (spinning) {
      spinSoundRef.current?.play()
    } else {
      spinSoundRef.current?.pause()
      if (spinSoundRef.current) {
        spinSoundRef.current.currentTime = 0
      }
    }
  }, [spinning])

  // Handle reel stop sounds
  useEffect(() => {
    if (reelsStopped.some((stopped) => stopped)) {
      stopSoundRef.current?.play()
    }
  }, [reelsStopped])

  // Handle win sound
  useEffect(() => {
    if (showResult) {
      winSoundRef.current?.play()
    }
  }, [showResult])

  return null // This component doesn't render anything
}