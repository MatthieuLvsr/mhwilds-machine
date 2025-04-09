import { motion } from "framer-motion"

interface ReelLabelProps {
  label: string
  color: string
}

export default function ReelLabel({ label, color }: ReelLabelProps) {
  return (
    <motion.div
      className={`flex-1 text-center font-semibold ${color} px-2 py-1 rounded-md bg-amber-950/50 border border-amber-800/30`}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label}
    </motion.div>
  )
}