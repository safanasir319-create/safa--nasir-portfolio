import { FiHeart } from 'react-icons/fi'

export default function Footer({ name }) {
  return (
    <footer className="relative z-10 border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {name || 'Safa Nasir'}. Built with React + Supabase.
        </p>
        <p className="flex items-center gap-1.5 font-mono text-xs text-ink-faint">
          Made with <FiHeart size={11} className="text-aurora-pink" /> and lots of coffee
        </p>
        <a href="/admin" className="font-mono text-xs text-ink-faint transition hover:text-aurora-teal">
          Admin →
        </a>
      </div>
    </footer>
  )
}
