import { motion } from 'framer-motion'

export default function Loader({ label = 'Loading portfolio' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-aurora-teal"
            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">{label}…</p>
    </div>
  )
}
