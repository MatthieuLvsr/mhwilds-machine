import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import MonsterIcon from "./monster-icon"
import ChallengeIcon from "./challenge-icon"
import WeaponIcon from "./weapon-icon"
import type { Monster } from "@/resources"

interface ReelProps {
  index: number
  result: string | Monster
  isSpinning: boolean
  isStopped: boolean
  isShaking: boolean
}

export default function Reel({ index, result, isSpinning, isShaking }: ReelProps) {
  // 🔎 Extraire le texte à afficher
  const getLabel = () => {
    if (!result || result === "?") return "?"
    return typeof result === "string" ? result : result.name
  }

  // 🎨 Couleur en fonction du type de slot
  const getTextColor = () => {
    if (index === 0) return "text-red-400"
    if (index === 1) return "text-blue-400"
    if (index === 2) return "text-yellow-400"
    return ""
  }

  // 🎭 Icône dynamique selon le type
  const renderIcon = () => {
    if (!result || result === "?") return null
    if (index === 0 && typeof result !== "string") return <MonsterIcon monster={result} size={64} />
    if (index === 1 && typeof result === "string") return <WeaponIcon weapon={result} size={64} />
    if (index === 2 && typeof result === "string") return <ChallengeIcon challenge={result} size={24} />
    return null
  }

  return (
    <motion.div
      className="flex-1 bg-amber-950 rounded-lg p-4 h-40 flex items-center justify-center overflow-hidden border-2 border-amber-600 shadow-inner"
      animate={{
        x: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
        y: isShaking ? [0, -3, 3, -3, 3, 0] : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isSpinning ? (
          <motion.div
            key={`spinning-${index}`}
            className="flex flex-col items-center"
            animate={{ y: [0, -500, 0] }}
            transition={{
              repeat: isSpinning ? Infinity : 0,
              duration: 0.5 + index * 0.2,
              ease: "linear",
              repeatType: "loop",
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.2 },
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-20 flex items-center justify-center text-amber-100 font-bold text-xl">
                {i % 2 === 0 ? "?" : "!"}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`result-${index}-${getLabel()}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            {getLabel() !== "?" ? (
              <div className={cn("text-center font-bold text-xl flex flex-col items-center gap-2", getTextColor())}>
                <span>{getLabel()}</span>
                {renderIcon()}
              </div>
            ) : (
              <div className="text-amber-500 text-xl font-bold">?</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
