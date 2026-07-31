import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiArrowUpRight, FiSend } from 'react-icons/fi'

export default function Contact({ hero }) {
  const { email, linkedin, github, location } = hero || {}

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong relative overflow-hidden rounded-3xl px-8 py-20 text-center sm:px-20"
      >
        {/* Glows */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-aurora-violet/25 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-aurora-teal/15 blur-[80px]" />

        <div className="relative">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-aurora-violet/25 bg-aurora-violet/10">
            <FiSend size={24} className="text-aurora-violet" />
          </div>

          <p className="eyebrow mb-4">Let's connect</p>
          <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            Let's build something<br />
            <span style={{ background: 'linear-gradient(130deg,#7c6cf6,#45e8c4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              worth shipping.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-ink-muted">
            Open to full-stack roles, freelance builds, and interesting problems. Let's make something great together.
          </p>

          {email && (
            <a href={`mailto:${email}`} className="btn-primary mx-auto mt-8 w-fit text-base">
              <FiMail size={16} /> {email} <FiArrowUpRight size={14} />
            </a>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {location && (
              <span className="flex items-center gap-2 text-sm text-ink-muted">
                <FiMapPin size={14} className="text-aurora-teal" /> {location}
              </span>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm text-ink-muted transition hover:text-aurora-teal">
                <FiGithub size={14} /> GitHub
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm text-ink-muted transition hover:text-aurora-violet">
                <FiLinkedin size={14} /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
