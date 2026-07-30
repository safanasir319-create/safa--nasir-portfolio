import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiLock, FiMail, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { isAuthenticated, loading, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const redirectTo = location.state?.from?.pathname || '/admin'

  // Already signed in — skip straight to the dashboard.
  if (!loading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await signIn(email.trim(), password)
      setStatus('idle')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg(err.message || 'Invalid email or password.')
    }
  }

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-strong w-full max-w-sm rounded-2xl p-8"
      >
        <p className="eyebrow">$ /admin/login</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-muted">Sign in to manage your portfolio content.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="label-field" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label-field" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pl-10"
              />
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-start gap-2 rounded-xl border border-aurora-pink/30 bg-aurora-pink/10 px-3 py-2.5 text-xs text-aurora-pink">
              <FiAlertCircle className="mt-0.5 shrink-0" size={14} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
            {status === 'loading' ? 'Signing in…' : 'Sign in'}
            {status !== 'loading' && <FiArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-[11px] text-ink-faint">
          Admin access only · create a user in Supabase Auth to sign in
        </p>
      </motion.div>
    </div>
  )
}
