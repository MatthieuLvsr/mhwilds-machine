import { motion } from "framer-motion"
import UnknownMonsterIcon from "@/resources/monsters/unknown.png"

export type UnknownIconProps = {
  size: number
  index: number
  isSpinning: boolean
}

export default function UnknownIcon({ size, index, isSpinning }: UnknownIconProps) {
  if (!UnknownMonsterIcon) {
    console.warn("No icon found")
    return null
  }

  // Crée une série d'icônes à scroller
  const items = Array.from({ length: 12 }).map((_, i) => (
    <img
      key={i}
      src={UnknownMonsterIcon}
      alt="Unknown"
      width={size}
      height={size}
      className="object-contain pointer-events-none select-none"
      draggable={false}
      style={{ width: size, height: size }}
    />
  ))

  return (
    <div
      className="relative overflow-hidden"
    >
      <motion.div
        animate={isSpinning ? { y: [-size * 5, 0] } : { y: 0 }}
        transition={{
          repeat: isSpinning ? Infinity : 0,
          duration: 0.6 + index * 0.2,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col"
      >
        {items}
      </motion.div>
    </div>
  )
}