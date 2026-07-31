import { motion } from 'framer-motion'

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-aurora-violet/20" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-aurora-violet"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className="h-2 w-2 rounded-full bg-aurora-teal shadow-[0_0_10px_rgba(69,232,196,0.8)]" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">{label}…</p>
    </div>
  )
}
