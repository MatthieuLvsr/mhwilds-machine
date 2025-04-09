import { motion } from "framer-motion"
import { Trophy, TrendingUp, Award } from "lucide-react"

interface ScoreDisplayProps {
  score: number
  monster: string
  challenge: string
  monsterScore: number
  challengeBonus: number
}

export default function ScoreDisplay({ score, monster, challenge, monsterScore, challengeBonus }: ScoreDisplayProps) {
  // Déterminer si le score est élevé (plus de 120 points)
  const isHighScore = score > 120

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -20, height: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="mb-6 overflow-hidden relative"
    >
      {isHighScore && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-amber-300 z-10 flex items-center gap-1"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <Award className="h-3 w-3 mr-1" />
          HIGH SCORE!
        </motion.div>
      )}

      <div
        className={`bg-gradient-to-r ${isHighScore ? "from-amber-900/90 via-amber-800 to-amber-900/90 border-amber-400/70" : "from-amber-950/80 via-amber-900 to-amber-950/80 border-amber-500/50"} p-5 rounded-lg border shadow-lg`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-5 w-5 text-amber-400" />
            <span className="text-lg font-semibold text-amber-200">Hunt Score</span>
            <Trophy className="h-5 w-5 text-amber-400" />
          </div>

          <motion.div
            className="flex items-center justify-center gap-2 text-3xl font-bold text-amber-100"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <motion.span
              animate={
                isHighScore
                  ? {
                      scale: [1, 1.1, 1],
                      color: ["#f59e0b", "#fbbf24", "#f59e0b"],
                    }
                  : {}
              }
              transition={
                isHighScore
                  ? {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }
                  : {}
              }
            >
              {score} Points
            </motion.span>
          </motion.div>

          <div className="w-full max-w-md mt-3 pt-3 border-t border-amber-700/50">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-amber-300">Base Monster Score:</div>
              <div className="text-right text-red-400 font-semibold">{monsterScore} pts</div>

              <div className="text-amber-300">Challenge Bonus:</div>
              <div className="text-right text-yellow-400 font-semibold flex items-center justify-end">
                <TrendingUp className="h-3 w-3 mr-1" />+{challengeBonus}%
              </div>

              <div className="col-span-2 mt-2 pt-2 border-t border-amber-700/30">
                <div className="flex justify-between items-center">
                  <span className="text-amber-200">Final Score:</span>
                  <motion.span
                    className="text-lg font-bold text-amber-100"
                    animate={{
                      color: ["#fbbf24", "#ffffff", "#fbbf24"],
                      textShadow: [
                        "0 0 0px rgba(251, 191, 36, 0)",
                        "0 0 10px rgba(251, 191, 36, 0.7)",
                        "0 0 0px rgba(251, 191, 36, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {score} Points
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {isHighScore && (
            <motion.div
              className="mt-3 bg-amber-800/50 px-4 py-2 rounded-lg border border-amber-500/30 text-sm text-amber-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-300" />
                <span>Impressive! This is a challenging hunt!</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}