export default function Footer({ name }) {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink-faint md:flex-row">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {name || 'Portfolio'}. Built with React + Supabase.
        </p>
        <p className="font-mono text-xs">
          <a href="/admin" className="transition hover:text-aurora-teal">
            $ admin
          </a>
        </p>
      </div>
    </footer>
  )
}
