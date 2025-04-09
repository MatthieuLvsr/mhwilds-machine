import {
  Droplet,
  SnailIcon as Snare,
  ShieldOff,
  UserMinus,
  PackageX,
  Timer,
  HandMetal,
  HeartPulse,
  Shirt,
  Plane,
} from "lucide-react"
import { motion } from "framer-motion"

interface ChallengeIconProps {
  challenge: string
  size?: number
  className?: string
}

export default function ChallengeIcon({ challenge, size = 24, className = "" }: ChallengeIconProps) {
  const getIcon = () => {
    switch (challenge) {
      case "No Healing":
        return <Droplet />
      case "Only Traps":
        return <Snare />
      case "No Armor":
        return <ShieldOff />
      case "Solo Run":
        return <UserMinus />
      case "No Items":
        return <PackageX />
      case "Time Attack":
        return <Timer />
      case "Capture Only":
        return <HandMetal />
      case "No Faints":
        return <HeartPulse />
      case "Naked Run":
        return <Shirt />
      case "Aerial Attacks Only":
        return <Plane />
      default:
        return <ShieldOff />
    }
  }

  return (
    <motion.div
      className={`text-yellow-400 ${className}`}
      style={{ width: size, height: size }}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        rotate: [0, 15, 0, -15, 0],
        filter: [
          "drop-shadow(0 0 0px rgba(251, 191, 36, 0))",
          "drop-shadow(0 0 3px rgba(251, 191, 36, 0.7))",
          "drop-shadow(0 0 0px rgba(251, 191, 36, 0))",
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