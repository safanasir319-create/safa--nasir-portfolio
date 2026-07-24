import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-3xl font-semibold text-ink">Route not found</h1>
      <Link to="/" className="btn-ghost mt-2">
        Back home
      </Link>
    </div>
  )
}
