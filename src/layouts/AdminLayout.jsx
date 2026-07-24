import { Link } from 'react-router-dom'

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

export default function AdminLayout({ active, onChange, children }) {
  return (
    <div className="relative z-10 min-h-screen px-4 pb-20 pt-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <aside className="glass-strong h-fit rounded-2xl p-4 lg:sticky lg:top-8 lg:w-56">
          <Link to="/" className="mb-6 flex items-center gap-2 px-2 font-mono text-xs text-ink-muted transition hover:text-aurora-teal">
            ← back to site
          </Link>
          <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-wide text-ink-faint">Dashboard</p>
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-left font-medium transition ${
                  active === tab.id
                    ? 'bg-aurora-violet text-void'
                    : 'text-ink-muted hover:bg-white/5 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
