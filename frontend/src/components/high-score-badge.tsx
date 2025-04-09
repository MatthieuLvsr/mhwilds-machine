import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

interface HighScoreBadgeProps {
  score: number
}

export default function HighScoreBadge({ score }: HighScoreBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.5,
      }}
      className="absolute top-0 right-0 -mt-4 -mr-4 bg-gradient-to-br from-amber-500 to-amber-700 px-3 py-1 rounded-full shadow-lg border-2 border-amber-300 flex items-center gap-1"
    >
      <Trophy className="h-4 w-4 text-amber-200" />
      <span className="text-sm font-bold text-white">{score}</span>
    </motion.div>
  )
}