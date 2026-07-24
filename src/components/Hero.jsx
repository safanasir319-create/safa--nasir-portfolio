import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiDownload, FiArrowDown } from 'react-icons/fi'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero({ hero }) {
  const name = hero?.name || 'Your Name'
  const title = hero?.title || 'Full-Stack Developer'
  const subtitle =
    hero?.subtitle ||
    'I design and ship interactive, data-driven products — from database schema to the last pixel.'

  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-28">
      {/* floating aurora blobs — signature ambient motion */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-aurora-violet/25 blur-[110px] animate-drift" />
        <div className="absolute right-[-10%] top-1/3 h-[380px] w-[380px] rounded-full bg-aurora-teal/20 blur-[110px] animate-drift [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-aurora-pink/15 blur-[110px] animate-drift [animation-delay:6s]" />
      </div>

      {hero?.profile_image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="animate-float pointer-events-none absolute right-10 top-28 hidden h-56 w-44 overflow-hidden rounded-3xl border border-white/10 shadow-glass lg:block xl:right-24"
        >
          <img src={hero.profile_image} alt={hero?.name} className="h-full w-full object-cover" />
        </motion.div>
      )}

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-4xl">
        <motion.p variants={item} className="eyebrow mb-5">
          $ whoami
        </motion.p>

        <motion.h1 variants={item} className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
          {name}
        </motion.h1>

        <motion.h2 variants={item} className="mt-4 font-display text-2xl font-medium text-gradient sm:text-3xl">
          {title}
        </motion.h2>

        <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <button onClick={scrollToProjects} className="btn-primary">
            View projects
            <FiArrowDown className="transition group-hover:translate-y-0.5" />
          </button>
          {hero?.resume && (
            <a href={hero.resume} target="_blank" rel="noreferrer" className="btn-ghost">
              <FiDownload /> Resume
            </a>
          )}
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-4">
          {hero?.github && (
            <SocialIcon href={hero.github} label="GitHub">
              <FiGithub />
            </SocialIcon>
          )}
          {hero?.linkedin && (
            <SocialIcon href={hero.linkedin} label="LinkedIn">
              <FiLinkedin />
            </SocialIcon>
          )}
          {hero?.twitter && (
            <SocialIcon href={hero.twitter} label="Twitter">
              <FiTwitter />
            </SocialIcon>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:border-aurora-teal/50 hover:text-aurora-teal"
    >
      {children}
    </a>
  )
}
