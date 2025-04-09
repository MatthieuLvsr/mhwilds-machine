import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import MonsterIcon from "./monster-icon"
import ChallengeIcon from "./challenge-icon"
import WeaponIcon from "./weapon-icon"

interface ReelProps {
  index: number
  result: string
  isSpinning: boolean
  isStopped: boolean
  isShaking: boolean
}

export default function Reel({ index, result, isSpinning, isStopped, isShaking }: ReelProps) {
  // Déterminer quel type d'icône afficher en fonction de l'index du rouleau
  const renderIcon = () => {
    if (index === 0) return <MonsterIcon monster={result} size={24} />
    if (index === 1) return <WeaponIcon weapon={result} size={24} />
    if (index === 2) return <ChallengeIcon challenge={result} size={24} />
    return null
  }

  // Déterminer la couleur du texte en fonction de l'index du rouleau
  const getTextColor = () => {
    if (index === 0) return "text-red-400"
    if (index === 1) return "text-blue-400"
    if (index === 2) return "text-yellow-400"
    return ""
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
              repeat: isSpinning ? Number.POSITIVE_INFINITY : 0,
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
            key={`result-${result}-${index}`}
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
            {result && result !== "?" ? (
              <div className={cn("text-center font-bold text-xl flex flex-col items-center gap-2", getTextColor())}>
                <span>{result}</span>
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