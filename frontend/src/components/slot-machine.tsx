import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReelLabel from "./reel-label"
import ResultCard from "./result-card"
import Reel from "./reel"
import ScoreDisplay from "./score-display"
import HighScoreBadge from "./high-score-badge"
import SoundEffects from "./sound-effects"
import { getRandomItem } from "@/lib/utils"
import { monsters, type Monster } from "@/resources"

const weapons = ["GS", "DB", "Lance", "Bow", "HBG", "Hammer", "IG", "CB", "SA", "LBG", "SNS", "GL", "LS", "HH"]

const challenges = [
  "No Healing",
  "Only Traps",
  "No Armor",
  "Solo Run",
  "No Items",
  "Time Attack",
  "Capture Only",
  "No Faints",
  "Naked Run",
  "Aerial Attacks Only",
]

export const challengeBonuses = {
  "No Healing": 50,
  "Only Traps": 30,
  "No Armor": 40,
  "Solo Run": 35,
  "No Items": 45,
  "Time Attack": 25,
  "Capture Only": 20,
  "No Faints": 60,
  "Naked Run": 55,
  "Aerial Attacks Only": 35,

  // 🆕 Niveau clown fiesta
  "Drunk Controls (Invert Camera)": 45,
  "Gathering Tools Only": 70,
  "Kick Only (No Weapons)": 90,
  "Felyne Friend Must Land Final Hit": 60,
  "No Rolling, Only Walking": 50,
  "Palico-Only Fight (Player AFK)": 100,
  "Camera Zoomed All The Way In": 25,
  "No Target Lock": 15,
  "No Dodge, Only Guard": 35,
  "No Combos (1 hit max per opening)": 30,
  "Always Singing (Spam Horn Songs)": 20,
  "Every Hit Must Be a Mount Attack": 65,
  "Paralyze the Monster Before Every Hit": 75,
  "Use Random Weapon Each Zone": 60,
  "No Sprinting, Only Hops": 40,
}

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false)
  const [results, setResults] = useState<[Monster | null, string, string]>([null, "", ""])
  const [reelsStopped, setReelsStopped] = useState([false, false, false])
  const [showResult, setShowResult] = useState(false)
  const [shakeReel, setShakeReel] = useState<number | null>(null)
  const [reelsSpinning, setReelsSpinning] = useState([false, false, false])

  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const calculateScore = (monster: Monster, challenge: string) => {
    const baseScore = monster.score
    const bonus = challengeBonuses[challenge as keyof typeof challengeBonuses] ?? 0
    return Math.round(baseScore * (1 + bonus / 100))
  }

  const spin = () => {
    setSpinning(true)
    setShowResult(false)
    setShowScore(false)
    setReelsStopped([false, false, false])
    setReelsSpinning([true, true, true])
    setShakeReel(null)

    const monster = getRandomItem(monsters)
    const weapon = getRandomItem(weapons)
    const challenge = getRandomItem(challenges)

    const newResults: [Monster, string, string] = [monster, weapon, challenge]
    setResults([null, "", ""])

    setTimeout(() => {
      setResults([monster, "", ""] as any)
      setReelsStopped([true, false, false])
      setReelsSpinning([false, true, true])
      setShakeReel(0)
      setTimeout(() => setShakeReel(null), 300)
    }, 1500)

    setTimeout(() => {
      setResults([monster, weapon, ""] as any)
      setReelsStopped([true, true, false])
      setReelsSpinning([false, false, true])
      setShakeReel(1)
      setTimeout(() => setShakeReel(null), 300)
    }, 2500)

    setTimeout(() => {
      setResults(newResults)
      setReelsStopped([true, true, true])
      setReelsSpinning([false, false, false])
      setSpinning(false)
      setShowResult(true)
      setShakeReel(2)
      setTimeout(() => setShakeReel(null), 300)

      const newScore = calculateScore(monster, challenge)
      setScore(newScore)

      if (newScore > highScore) {
        setHighScore(newScore)
      }

      setTimeout(() => {
        setShowScore(true)
      }, 1000)
    }, 3500)
  }

  const reset = () => {
    setSpinning(false)
    setReelsStopped([false, false, false])
    setReelsSpinning([false, false, false])
    setResults([null, "", ""])
    setShowResult(false)
    setShowScore(false)
    setShakeReel(null)
    setScore(0)
  }

  useEffect(() => {
    spin()
  }, [])

  return (
    <div className="w-full max-w-2xl bg-amber-800 rounded-xl shadow-2xl p-6 border-4 border-amber-600 relative">
      {highScore > 0 && <HighScoreBadge score={highScore} />}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {[0, 1, 2].map((reelIndex) => (
          <Reel
            key={reelIndex}
            index={reelIndex}
            result={results[reelIndex] as any} // adjust types inside Reel if needed
            isSpinning={reelsSpinning[reelIndex]}
            isStopped={reelsStopped[reelIndex]}
            isShaking={shakeReel === reelIndex}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <ReelLabel label="Monster" color="text-red-300" />
        <ReelLabel label="Weapon" color="text-blue-300" />
        <ReelLabel label="Challenge" color="text-yellow-300" />
      </div>

      <AnimatePresence>
        {showResult && (
          <ResultCard
            monster={results[0]||monsters[0]}
            weapon={results[1]}
            challenge={results[2]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScore && results[0] && (
          <ScoreDisplay
            score={score}
            monster={results[0].name}
            challenge={results[2]}
            monsterScore={results[0].score}
            challengeBonus={challengeBonuses[results[2] as keyof typeof challengeBonuses] || 0}
          />
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-4">
        <Button
          onClick={spin}
          disabled={spinning}
          className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-6 text-lg"
        >
          <Play className="mr-2 h-5 w-5" /> Spin
        </Button>

        <Button
          onClick={reset}
          disabled={spinning}
          variant="outline"
          className="border-amber-600 text-amber-100 hover:bg-amber-700 px-8 py-6 text-lg"
        >
          <RotateCcw className="mr-2 h-5 w-5" /> Reset
        </Button>
      </div>

      <SoundEffects spinning={spinning} reelsStopped={reelsStopped} showResult={showResult} />
    </div>
  )
}
