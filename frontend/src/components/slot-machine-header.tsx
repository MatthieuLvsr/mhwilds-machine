import { motion } from "framer-motion"
import { Sword, Skull, Trophy } from "lucide-react"

export default function SlotMachineHeader() {
  return (
    <motion.div
      className="w-full max-w-2xl mb-6 flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
            filter: [
              "drop-shadow(0 0 0px rgba(248, 113, 113, 0))",
              "drop-shadow(0 0 5px rgba(248, 113, 113, 0.7))",
              "drop-shadow(0 0 0px rgba(248, 113, 113, 0))",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            filter: { duration: 2, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <Skull className="h-8 w-8 text-red-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-amber-100 tracking-wider">WILDS CHALLENGE</h2>
        <motion.div
          animate={{
            rotate: [0, -15, 15, 0],
            scale: [1, 1.1, 1],
            filter: [
              "drop-shadow(0 0 0px rgba(96, 165, 250, 0))",
              "drop-shadow(0 0 5px rgba(96, 165, 250, 0.7))",
              "drop-shadow(0 0 0px rgba(96, 165, 250, 0))",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
            filter: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 },
          }}
        >
          <Sword className="h-8 w-8 text-blue-400" />
        </motion.div>
      </div>
      <p className="text-amber-200 text-center max-w-md">
        Spin the reels to get your next hunting assignment in Monster Hunter Wilds. Face the monster, master your
        weapon, and overcome the challenge!
      </p>
      <motion.div
        className="mt-4 flex items-center gap-2 bg-amber-900/50 px-4 py-2 rounded-full border border-amber-700/50"
        animate={{
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 0 0px rgba(251, 191, 36, 0)",
            "0 0 10px rgba(251, 191, 36, 0.3)",
            "0 0 0px rgba(251, 191, 36, 0)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Trophy className="h-5 w-5 text-amber-400" />
        <span className="text-sm font-medium text-yellow-200">
          Earn points based on monster difficulty and challenge!
        </span>
      </motion.div>
    </motion.div>
  )
}