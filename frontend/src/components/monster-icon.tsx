import { motion } from "framer-motion"
import { Flame, Zap, Wind, Mountain, Skull, Snowflake, Sword, Shield } from "lucide-react"

interface MonsterIconProps {
  monster: string
  size?: number
  className?: string
}

export default function MonsterIcon({ monster, size = 24, className = "" }: MonsterIconProps) {
  const getIcon = () => {
    switch (monster) {
      case "Arkveld":
        return <Snowflake />
      case "Doshaguma":
        return <Mountain />
      case "Quematrice":
        return <Flame />
      case "Zoh Shia":
        return <Shield />
      case "Guardian Rathalos":
        return <Sword />
      case "Chatacabra":
        return <Wind />
      case "Gore Magala":
        return <Skull />
      case "Rajang":
        return <Zap />
      default:
        return <Flame />
    }
  }

  const getColor = () => {
    switch (monster) {
      case "Arkveld":
        return "text-sky-400"
      case "Doshaguma":
        return "text-amber-500"
      case "Quematrice":
        return "text-red-500"
      case "Zoh Shia":
        return "text-emerald-400"
      case "Guardian Rathalos":
        return "text-red-600"
      case "Chatacabra":
        return "text-purple-400"
      case "Gore Magala":
        return "text-indigo-500"
      case "Rajang":
        return "text-yellow-400"
      default:
        return "text-red-400"
    }
  }

  return (
    <motion.div
      className={`${getColor()} ${className}`}
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
        rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        filter: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
    >
      {getIcon()}
    </motion.div>
  )
}