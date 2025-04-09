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

// Mise à jour des monstres pour Monster Hunter Wilds
const monsters = [
  "Arkveld",
  "Doshaguma",
  "Quematrice",
  "Zoh Shia",
  "Guardian Rathalos",
  "Chatacabra",
  "Gore Magala",
  "Rajang",
]

// Valeurs de score pour chaque monstre
const monsterScores = {
  "Arkveld": 60,
  "Doshaguma": 40,
  "Quematrice": 70,
  "Zoh Shia": 85,
  "Guardian Rathalos": 80,
  "Chatacabra": 50,
  "Gore Magala": 90,
  "Rajang": 100,
}

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

// Bonus de pourcentage pour chaque défi
const challengeBonuses = {
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
}

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false)
  const [results, setResults] = useState<string[]>(["", "", ""])
  const [reelsStopped, setReelsStopped] = useState([false, false, false])
  const [showResult, setShowResult] = useState(false)
  const [shakeReel, setShakeReel] = useState<number | null>(null)
  const [reelsSpinning, setReelsSpinning] = useState([false, false, false])

  // États pour le score
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)]

  // Fonction pour calculer le score
  const calculateScore = (monster: string, challenge: string) => {
    const baseScore = monsterScores[monster as keyof typeof monsterScores] || 50
    const bonusPercentage = challengeBonuses[challenge as keyof typeof challengeBonuses] || 0
    return Math.round(baseScore * (1 + bonusPercentage / 100))
  }

  const spin = () => {
    // Réinitialiser tous les états
    setSpinning(true)
    setShowResult(false)
    setShowScore(false)
    setReelsStopped([false, false, false])
    setReelsSpinning([true, true, true])
    setShakeReel(null)

    // Génération des résultats stockés localement
    const newResults = [getRandomItem(monsters), getRandomItem(weapons), getRandomItem(challenges)]

    // Réinitialiser les résultats avec des placeholders pendant le spin
    setResults(["?", "?", "?"])

    // Premier rouleau s'arrête
    setTimeout(() => {
      setResults([newResults[0], "?", "?"])
      setReelsStopped([true, false, false])
      setReelsSpinning([false, true, true])
      setShakeReel(0)
      setTimeout(() => setShakeReel(null), 300)
    }, 1500)

    // Deuxième rouleau s'arrête
    setTimeout(() => {
      setResults([newResults[0], newResults[1], "?"])
      setReelsStopped([true, true, false])
      setReelsSpinning([false, false, true])
      setShakeReel(1)
      setTimeout(() => setShakeReel(null), 300)
    }, 2500)

    // Troisième rouleau s'arrête
    setTimeout(() => {
      setResults(newResults)
      setReelsStopped([true, true, true])
      setReelsSpinning([false, false, false])
      setSpinning(false)
      setShowResult(true)
      setShakeReel(2)
      setTimeout(() => setShakeReel(null), 300)

      // Calculer et afficher le score après un court délai
      const newScore = calculateScore(newResults[0], newResults[2])
      setScore(newScore)

      // Mettre à jour le high score si nécessaire
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
    setResults(["", "", ""])
    setShowResult(false)
    setShowScore(false)
    setShakeReel(null)
    setScore(0)
  }

  // Auto-spin on first load
  useEffect(() => {
    spin()
  }, [])

  return (
    <div className="w-full max-w-2xl bg-amber-800 rounded-xl shadow-2xl p-6 border-4 border-amber-600 relative">
      {/* High Score Badge */}
      {highScore > 0 && <HighScoreBadge score={highScore} />}

      {/* Reels */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {[0, 1, 2].map((reelIndex) => (
          <Reel
            key={reelIndex}
            index={reelIndex}
            result={results[reelIndex]}
            isSpinning={reelsSpinning[reelIndex]}
            isStopped={reelsStopped[reelIndex]}
            isShaking={shakeReel === reelIndex}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <ReelLabel label="Monster" color="text-red-300" />
        <ReelLabel label="Weapon" color="text-blue-300" />
        <ReelLabel label="Challenge" color="text-yellow-300" />
      </div>

      {/* Result display */}
      <AnimatePresence>
        {showResult && <ResultCard monster={results[0]} weapon={results[1]} challenge={results[2]} />}
      </AnimatePresence>

      {/* Score display */}
      <AnimatePresence>
        {showScore && (
          <ScoreDisplay
            score={score}
            monster={results[0]}
            challenge={results[2]}
            monsterScore={monsterScores[results[0] as keyof typeof monsterScores] || 0}
            challengeBonus={challengeBonuses[results[2] as keyof typeof challengeBonuses] || 0}
          />
        )}
      </AnimatePresence>

      {/* Controls */}
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

      {/* Sound Effects */}
      <SoundEffects spinning={spinning} reelsStopped={reelsStopped} showResult={showResult} />
    </div>
  )
}