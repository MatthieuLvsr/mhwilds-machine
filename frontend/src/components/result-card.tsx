"use client"

import { motion } from "framer-motion"
import MonsterIcon from "./monster-icon"
import ChallengeIcon from "./challenge-icon"
import WeaponIcon from "./weapon-icon"
import type { Monster } from "@/resources"
import { getRarityClass } from "@/lib/rarity-utils"

interface ResultCardProps {
  monster: Monster
  weapon: string
  challenge: string
}

export default function ResultCard({ monster, weapon, challenge }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r from-amber-900/80 via-amber-800 to-amber-900/80 p-6 rounded-lg mb-4 border-2 border-amber-600/50 shadow-lg ${getRarityClass(monster.score)}`}
    >
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="flex items-center gap-2 mb-1"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <span className="text-lg font-semibold text-amber-200">Your next hunt:</span>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 text-xl"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-amber-100">Hunt a</span>
          <motion.div
            className="inline-flex items-center gap-1 font-bold text-red-400"
            animate={{
              textShadow: [
                "0 0 0px rgba(248, 113, 113, 0)",
                "0 0 8px rgba(248, 113, 113, 0.7)",
                "0 0 0px rgba(248, 113, 113, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {monster.name}
            {monster && <MonsterIcon monster={monster} size={24} />}
          </motion.div>
          <span className="text-amber-100">with a</span>
          <motion.div
            className="inline-flex items-center gap-1 font-bold text-blue-400"
            animate={{
              textShadow: [
                "0 0 0px rgba(96, 165, 250, 0)",
                "0 0 8px rgba(96, 165, 250, 0.7)",
                "0 0 0px rgba(96, 165, 250, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            {weapon}
            {weapon && <WeaponIcon weapon={weapon} size={20} />}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-3 flex items-center justify-center gap-2 bg-amber-950/70 px-5 py-3 rounded-lg border border-yellow-600/50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            boxShadow: [
              "0 0 0px rgba(251, 191, 36, 0)",
              "0 0 10px rgba(251, 191, 36, 0.3)",
              "0 0 0px rgba(251, 191, 36, 0)",
            ],
          }}
          transition={{
            delay: 0.6,
            type: "spring",
            boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <span className="text-yellow-200 font-medium">Challenge:</span>
          <div className="inline-flex items-center gap-2">
            <span className="font-bold text-yellow-400">{challenge}</span>
            {challenge && <ChallengeIcon challenge={challenge} size={20} />}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}