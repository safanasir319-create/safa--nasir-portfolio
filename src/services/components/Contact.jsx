import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiArrowUpRight } from 'react-icons/fi'

export default function Contact({ hero }) {
  const email = hero?.email
  const linkedin = hero?.linkedin
  const github = hero?.github
  const location = hero?.location

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="glass-strong relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-aurora-violet/25 blur-[100px]" />

        <p className="eyebrow mb-4">$ mail --compose</p>
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl">
          Let's build something <span className="text-gradient">worth shipping.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          Open to full-stack roles, freelance builds, and interesting problems.
        </p>

        {email && (
          <a
            href={`mailto:${email}`}
            className="btn-primary mx-auto mt-8 w-fit"
          >
            {email} <FiArrowUpRight />
          </a>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-ink-muted">
          {location && (
            <span className="flex items-center gap-2">
              <FiMapPin className="text-aurora-teal" /> {location}
            </span>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-aurora-teal">
              <FiGithub /> GitHub
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-aurora-violet">
              <FiLinkedin /> LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </section>
  )
}
