import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import MonsterIcon from "./monster-icon"
import ChallengeIcon from "./challenge-icon"
import WeaponIcon from "./weapon-icon"
import UnknownIcon from "./unknown-icon"
import type { Monster } from "@/resources"
import UnknownMonsterIcon from "@/resources/monsters/unknown.png"

interface ReelProps {
  index: number
  result: string | Monster
  isSpinning: boolean
  isStopped: boolean
  isShaking: boolean
}

export default function Reel({ index, result, isSpinning, isShaking }: ReelProps) {
  const getLabel = () => {
    if (!result || result === "?") return <img width={128} height={128} src={UnknownMonsterIcon}/>
    return typeof result === "string" ? result : result.name
  }

  const getTextColor = () => {
    if (index === 0) return "text-red-400"
    if (index === 1) return "text-blue-400"
    if (index === 2) return "text-yellow-400"
    return ""
  }

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
          <UnknownIcon size={64} index={index} isSpinning={isSpinning} />
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