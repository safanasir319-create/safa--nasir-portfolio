import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiDownload, FiArrowDown, FiCode } from 'react-icons/fi'

const c = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
const i = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero({ hero }) {
  const name = hero?.name || 'Safa Nasir'
  const title = hero?.title || 'Full-Stack Developer'
  const subtitle = hero?.subtitle || 'Building intelligent, scalable web apps — from the database to the last pixel.'

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-20 sm:px-6">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 -top-24 h-[650px] w-[650px] rounded-full bg-aurora-violet/20 blur-[130px] animate-drift" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-aurora-teal/14 blur-[120px] animate-drift [animation-delay:5s]" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-aurora-pink/12 blur-[110px] animate-drift [animation-delay:10s]" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* ── Left: content ── */}
          <motion.div variants={c} initial="hidden" animate="show">
            <motion.div variants={i}>
              <span className="inline-flex items-center gap-2 rounded-full border border-aurora-teal/20 bg-aurora-teal/5 px-4 py-1.5 font-mono text-xs text-aurora-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-aurora-teal shadow-[0_0_8px_rgba(69,232,196,0.9)] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1 variants={i} className="mt-5 font-display text-5xl font-bold leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {name}
            </motion.h1>

            <motion.div variants={i} className="mt-3">
              <span className="font-display text-2xl font-semibold sm:text-3xl" style={{ background: 'linear-gradient(130deg,#7c6cf6,#45e8c4,#f65ca0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {title}
              </span>
            </motion.div>

            <motion.p variants={i} className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              {subtitle}
            </motion.p>

            <motion.div variants={i} className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
                View my work <FiArrowDown size={15} />
              </button>
              {hero?.resume && (
                <a href={hero.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                  <FiDownload size={15} /> Resume
                </a>
              )}
            </motion.div>

            <motion.div variants={i} className="mt-7 flex items-center gap-2.5">
              {hero?.github && <SIcon href={hero.github} label="GitHub"><FiGithub /></SIcon>}
              {hero?.linkedin && <SIcon href={hero.linkedin} label="LinkedIn"><FiLinkedin /></SIcon>}
              {hero?.twitter && <SIcon href={hero.twitter} label="Twitter"><FiTwitter /></SIcon>}
            </motion.div>

            <motion.div variants={i} className="mt-10 grid grid-cols-3 gap-6 border-t border-white/6 pt-8 max-w-xs">
              {[['10+','Projects'],['15+','Technologies'],['2nd','Semester']].map(([v,l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-bold text-ink">{v}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-ink-faint">{l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: photo card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="hidden lg:flex lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-aurora-violet/25 via-aurora-teal/15 to-aurora-pink/20 blur-2xl" />
              <div className="glass-card relative overflow-hidden rounded-[2rem] p-1.5">
                {hero?.profile_image ? (
                  <img src={hero.profile_image} alt={name} className="h-[440px] w-[340px] rounded-[1.6rem] object-cover" />
                ) : (
                  <div className="flex h-[440px] w-[340px] items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-aurora-violet/10 to-aurora-teal/5">
                    <FiCode size={52} className="text-aurora-violet/30" />
                  </div>
                )}
                {/* Floating chips */}
                <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass-strong absolute -right-5 bottom-20 rounded-2xl px-4 py-3">
                  <p className="font-mono text-[10px] text-ink-faint">STATUS</p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-display text-sm font-semibold text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-aurora-teal shadow-[0_0_6px_rgba(69,232,196,1)]" /> Open to work
                  </p>
                </motion.div>
                <motion.div animate={{ y: [0,10,0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="glass-strong absolute -left-5 top-14 rounded-2xl px-4 py-3">
                  <p className="font-mono text-[10px] text-ink-faint">STUDYING</p>
                  <p className="mt-0.5 font-display text-sm font-semibold text-ink">BS AI · 2nd Sem</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 md:flex">
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/12">
          <FiArrowDown size={11} className="text-ink-faint" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function SIcon({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 text-ink-muted transition-all hover:-translate-y-1 hover:border-aurora-teal/35 hover:bg-aurora-teal/5 hover:text-aurora-teal">
      {children}
    </a>
  )
}
