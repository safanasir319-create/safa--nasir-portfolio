import { Link, useNavigate } from 'react-router-dom'
import { FiLogOut, FiHome, FiUser, FiZap, FiFolder } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'

const TABS = [
  { id: 'hero', label: 'Hero', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'skills', label: 'Skills', icon: FiZap },
  { id: 'projects', label: 'Projects', icon: FiFolder },
]

export default function AdminLayout({ active, onChange, children }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try { await signOut() } finally { navigate('/admin/login', { replace: true }) }
  }

  return (
    <div className="relative z-10 min-h-screen px-4 pb-20 pt-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">

        {/* Sidebar */}
        <aside className="glass-strong flex h-fit flex-col rounded-2xl p-4 lg:sticky lg:top-8 lg:w-60 lg:shrink-0">
          {/* Brand */}
          <div className="mb-5 flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aurora-violet/20 border border-aurora-violet/25">
              <span className="font-mono text-xs font-bold text-aurora-violet">A</span>
            </div>
            <span className="font-display text-sm font-semibold text-ink">Admin Panel</span>
          </div>

          <Link to="/" className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-xs text-ink-muted transition hover:bg-white/5 hover:text-aurora-teal">
            ← Back to site
          </Link>

          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-widest text-ink-faint">Navigation</p>

          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                  active === id
                    ? 'bg-aurora-violet text-white shadow-[0_4px_16px_rgba(124,108,246,0.35)]'
                    : 'text-ink-muted hover:bg-white/5 hover:text-ink'
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </nav>

          {/* User + logout */}
          <div className="mt-5 border-t border-white/8 pt-4">
            {user?.email && (
              <div className="mb-3 px-3">
                <p className="font-mono text-[10px] text-ink-faint">Signed in as</p>
                <p className="mt-0.5 truncate font-mono text-[11px] text-ink-muted" title={user.email}>{user.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-aurora-pink/10 hover:text-aurora-pink"
            >
              <FiLogOut size={15} /> Log out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
