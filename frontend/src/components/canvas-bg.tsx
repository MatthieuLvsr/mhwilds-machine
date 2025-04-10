// G Rank Mode Enhancements ✨
// canvas-bg.tsx — add this near your root layout or SlotMachine
import { useEffect, useRef } from "react"

export default function CanvasParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const particles: { x: number; y: number; alpha: number; size: number; speed: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          alpha: Math.random() * 0.5 + 0.2,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.y += p.speed
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 200, 100, ${p.alpha})`
        ctx.fill()
      }
      requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] opacity-30 pointer-events-none"
    />
  )
}