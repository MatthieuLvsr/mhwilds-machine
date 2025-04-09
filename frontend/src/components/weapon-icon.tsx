import {
  Sword,
  Swords,
  Shield,
  BoxIcon as Bow,
  Crosshair,
  Hammer,
  Bug,
  Axe,
  Pickaxe,
  Target,
  SwordIcon,
  Shovel,
  Syringe,
  Music,
} from "lucide-react"
import { motion } from "framer-motion"

interface WeaponIconProps {
  weapon: string
  size?: number
  className?: string
}

export default function WeaponIcon({ weapon, size = 24, className = "" }: WeaponIconProps) {
  const getIcon = () => {
    switch (weapon) {
      case "GS": // Great Sword
        return <Sword />
      case "DB": // Dual Blades
        return <Swords />
      case "Lance":
        return <Shield />
      case "Bow":
        return <Bow />
      case "HBG": // Heavy Bowgun
        return <Crosshair />
      case "Hammer":
        return <Hammer />
      case "IG": // Insect Glaive
        return <Bug />
      case "CB": // Charge Blade
        return <Axe />
      case "SA": // Switch Axe
        return <Pickaxe />
      case "LBG": // Light Bowgun
        return <Target />
      case "SNS": // Sword and Shield
        return <SwordIcon />
      case "GL": // Gunlance
        return <Shovel />
      case "LS": // Long Sword
        return <Syringe />
      case "HH": // Hunting Horn
        return <Music />
      default:
        return <Sword />
    }
  }

  return (
    <motion.div
      className={`text-blue-400 ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        rotate: [0, 10, 0, -10, 0],
        filter: [
          "drop-shadow(0 0 0px rgba(96, 165, 250, 0))",
          "drop-shadow(0 0 3px rgba(96, 165, 250, 0.7))",
          "drop-shadow(0 0 0px rgba(96, 165, 250, 0))",
        ],
      }}
      transition={{
        scale: { duration: 0.3 },
        rotate: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        filter: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
    >
      {getIcon()}
    </motion.div>
  )
}