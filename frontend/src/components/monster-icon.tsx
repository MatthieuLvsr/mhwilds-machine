import { motion } from "framer-motion"
import type { Monster } from "@/resources"

interface MonsterIconProps {
  monster: Monster
  size?: number
  className?: string
}

export default function MonsterIcon({ monster, size = 24, className = "" }: MonsterIconProps) {
  if (!monster.icon) {
    console.warn("No icon found for monster:", monster.name)
    return null
  }

  return (
    <motion.div
      className={className}
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
        src={monster.icon}
        alt={monster.name}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  )
}
