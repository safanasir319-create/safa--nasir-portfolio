import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }
  const firstName = name?.split(' ')[0] || 'Portfolio'

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
      >
        <div className={`mx-auto max-w-6xl flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${scrolled ? 'glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.5)]' : ''}`}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-aurora-violet/30 to-aurora-teal/20 border border-aurora-violet/25">
              <span className="font-mono text-xs font-bold text-aurora-violet">{firstName[0]}</span>
            </div>
            <span className="font-display text-sm font-semibold text-ink">{firstName}<span className="text-aurora-teal">.</span></span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="rounded-xl px-4 py-2 font-mono text-xs text-ink-muted transition hover:bg-white/5 hover:text-ink">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => scrollTo('contact')}
              className="hidden rounded-xl border border-aurora-violet/25 bg-aurora-violet/10 px-4 py-2 font-mono text-xs font-medium text-aurora-violet transition hover:bg-aurora-violet hover:text-white md:block">
              Hire me
            </button>
            <button onClick={() => setOpen(v => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 text-ink-muted transition hover:border-white/15 hover:text-ink md:hidden">
              {open ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-strong fixed inset-x-4 top-[72px] z-40 rounded-2xl p-3 md:hidden">
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="block w-full rounded-xl px-4 py-3 text-left font-mono text-sm text-ink-muted transition hover:bg-white/5 hover:text-ink">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')}
              className="mt-2 w-full rounded-xl bg-aurora-violet px-4 py-3 font-mono text-sm font-semibold text-white">
              Hire me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
