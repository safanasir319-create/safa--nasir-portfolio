import AppRoutes from './routes/AppRoutes.jsx'
import CursorGlow from './components/CursorGlow.jsx'

export default function App() {
  return (
    <div className="bg-app relative min-h-screen overflow-x-hidden">
      <div className="bg-noise pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <CursorGlow />
      <AppRoutes />
    </div>
  )
}
