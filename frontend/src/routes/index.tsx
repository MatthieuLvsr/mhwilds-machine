import { createFileRoute } from '@tanstack/react-router'
import SlotMachineBackground from '@/components/slot-machine-background'
import SlotMachineHeader from '@/components/slot-machine-header'
import SlotMachine from '@/components/slot-machine'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  useEffect(() => {
    document.title = "Monster Hunter Slot Machine 🎰"
  }, [])
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (link) {
      link.href = "/rajang-angry.png"
    }
  }, [])
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-900 to-amber-950 p-4">
      <SlotMachineBackground />
      <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4 text-center">Monster Hunter Wilds</h1>
      <SlotMachineHeader />
      <SlotMachine />
      <footer className="mt-8 text-amber-400/60 text-sm text-center">
        <p>Not affiliated with CAPCOM or Monster Hunter™</p>
        <p>Created for entertainment purposes only</p>
      </footer>
    </main>
  )
}
