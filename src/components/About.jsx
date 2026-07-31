import { motion } from 'framer-motion'
import { FiBriefcase, FiCpu, FiMapPin, FiAward } from 'react-icons/fi'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

export default function About({ about }) {
  const description = about?.description || 'Add an about entry in the admin dashboard to introduce yourself here — your background, what you build, and what you care about.'

  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.p {...fade()} className="eyebrow mb-3">About me</motion.p>
      <motion.h2 {...fade(0.05)} className="section-title mb-12">
        The person behind <span className="text-gradient">the code</span>
      </motion.h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Bio card */}
        <motion.div {...fade(0.1)} className="card-bento md:col-span-2">
          <h3 className="font-display text-xl font-semibold text-ink">Hi, I'm Safa 👋</h3>
          <p className="mt-4 whitespace-pre-line text-base leading-[1.8] text-ink-muted">{description}</p>
        </motion.div>

        {/* Info card */}
        <div className="flex flex-col gap-4">
          <motion.div {...fade(0.15)} className="card-bento">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aurora-teal/10 border border-aurora-teal/15">
                <FiBriefcase size={15} className="text-aurora-teal" />
              </div>
              <p className="font-mono text-xs text-ink-faint">Status</p>
            </div>
            <p className="flex items-center gap-2 font-display text-base font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-aurora-teal shadow-[0_0_10px_rgba(69,232,196,0.8)] animate-pulse" />
              Open to work
            </p>
          </motion.div>

          <motion.div {...fade(0.2)} className="card-bento">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aurora-violet/10 border border-aurora-violet/15">
                <FiCpu size={15} className="text-aurora-violet" />
              </div>
              <p className="font-mono text-xs text-ink-faint">Stack</p>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">React · Supabase · Node.js · PostgreSQL · Python</p>
          </motion.div>

          <motion.div {...fade(0.25)} className="card-bento">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aurora-pink/10 border border-aurora-pink/15">
                <FiAward size={15} className="text-aurora-pink" />
              </div>
              <p className="font-mono text-xs text-ink-faint">Studying</p>
            </div>
            <p className="text-sm text-ink-muted">BS Artificial Intelligence · 2nd Semester</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
