import { weaponIcons } from "@/resources"
import { motion } from "framer-motion"

interface WeaponIconProps {
  weapon: string
  size?: number
  className?: string
}

export default function WeaponIcon({ weapon, size = 24, className = "" }: WeaponIconProps) {
  const iconSrc = weaponIcons[weapon]

  if (!iconSrc) {
    console.warn(`Missing icon for weapon: ${weapon}`)
    return (
      <div
        className={`bg-red-700 text-white text-xs flex items-center justify-center rounded ${className}`}
        style={{ width: size, height: size }}
      >
        ❓
      </div>
    )
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
        rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <img
        src={iconSrc}
        alt={weapon}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  )
}
