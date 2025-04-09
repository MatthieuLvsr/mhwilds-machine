import { monsterIcons } from "@/resources"
import { motion } from "framer-motion"
import clsx from "clsx"

interface MonsterIconProps {
  monster: string
  size?: number
  className?: string
}

const monsterColors: Record<string, string> = {
  Arkveld: "text-sky-400",
  Doshaguma: "text-amber-500",
  Quematrice: "text-red-500",
  "Zoh Shia": "text-emerald-400",
  "Guardian Rathalos": "text-red-600",
  Chatacabra: "text-purple-400",
  "Gore Magala": "text-indigo-500",
  Rajang: "text-yellow-400",
}

export default function MonsterIcon({ monster, size = 48, className = "" }: MonsterIconProps) {
  const iconSrc = monsterIcons[monster]
  const colorClass = monsterColors[monster] ?? "text-red-400"

  if (!iconSrc) {
    console.warn(`No icon found for monster: ${monster}`)
    return null
  }

  return (
    <motion.div
      className={clsx(colorClass, className)}
      style={{ width: size, height: size }}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        rotate: [0, 5, 0, -5, 0],
        filter: [
          "drop-shadow(0 0 0px rgba(248, 113, 113, 0))",
          "drop-shadow(0 0 3px rgba(248, 113, 113, 0.7))",
          "drop-shadow(0 0 0px rgba(248, 113, 113, 0))",
        ],
      }}
      transition={{
        scale: { duration: 0.3 },
        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <img
        src={iconSrc}
        alt={monster}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  )
}