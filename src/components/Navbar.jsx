import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
]

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-glass' : ''
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-sm font-semibold tracking-tight text-ink"
        >
          {name ? name.split(' ')[0] : 'portfolio'}
          <span className="text-aurora-teal">.</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-muted transition hover:bg-white/5 hover:text-ink"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button onClick={() => scrollTo('contact')} className="rounded-full bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink transition hover:bg-aurora-violet hover:text-void">
          say hi
        </button>
      </div>
    </motion.header>
  )
}
