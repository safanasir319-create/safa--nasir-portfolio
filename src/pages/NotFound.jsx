import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="eyebrow mb-3">404 · Page not found</p>
        <h1 className="font-display text-4xl font-bold text-ink">Wrong turn.</h1>
        <p className="mt-3 text-ink-muted">This route doesn't exist.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">Back home</Link>
      </motion.div>
    </div>
  )
}
