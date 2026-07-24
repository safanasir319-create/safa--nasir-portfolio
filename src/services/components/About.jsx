import { motion } from 'framer-motion'

export default function About({ about }) {
  const description =
    about?.description ||
    'Add an about entry in the admin dashboard to introduce yourself here — your background, what you build, and what you care about.'

  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow mb-4"
      >
        $ cat about.md
      </motion.p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="card-bento md:col-span-2"
        >
          <h3 className="font-display text-2xl font-semibold text-ink">About</h3>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink-muted">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="card-bento flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">status</p>
            <p className="mt-2 flex items-center gap-2 font-display text-lg text-ink">
              <span className="h-2 w-2 rounded-full bg-aurora-teal shadow-[0_0_10px_2px_rgba(69,232,196,0.6)]" />
              Open to work
            </p>
          </div>
          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">stack</p>
            <p className="mt-2 text-sm text-ink-muted">React · Supabase · Node · Postgres</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
