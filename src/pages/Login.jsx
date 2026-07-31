import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiLock, FiMail, FiArrowRight, FiAlertCircle, FiShield } from 'react-icons/fi'
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

  if (!loading && isAuthenticated) return <Navigate to={redirectTo} replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await signIn(email.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Invalid email or password.')
    }
  }

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-violet/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-aurora-teal/15 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card glow */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-aurora-violet/30 via-transparent to-aurora-teal/20 blur-xl opacity-60" />

        <div className="glass-strong relative rounded-3xl p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-aurora-violet/30 bg-aurora-violet/10">
              <FiShield size={28} className="text-aurora-violet" />
            </div>
            <p className="eyebrow mb-2">Admin Portal</p>
            <h1 className="font-display text-3xl font-bold text-ink">Welcome back</h1>
            <p className="mt-2 text-sm text-ink-muted">Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label-field" htmlFor="email">Email address</label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
                <input
                  id="email" type="email" autoComplete="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label-field" htmlFor="password">Password</label>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
                <input
                  id="password" type="password" autoComplete="current-password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11"
                />
              </div>
            </div>

            {/* Error */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl border border-aurora-pink/25 bg-aurora-pink/8 px-4 py-3 text-sm text-aurora-pink"
              >
                <FiAlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Submit */}
            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center text-base">
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">Sign in <FiArrowRight /></span>
              )}
            </button>
          </form>

          <p className="mt-6 text-center font-mono text-[11px] text-ink-faint">
            Admin only · users managed in Supabase Auth dashboard
          </p>
        </div>
      </motion.div>
    </div>
  )
}
