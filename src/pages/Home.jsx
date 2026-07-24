import { usePortfolio } from '../context/PortfolioContext.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Projects from '../components/Projects.jsx'
import Contact from '../components/Contact.jsx'
import Loader from '../components/Loader.jsx'

export default function Home() {
  const { hero, about, skills, projects, loading, error } = usePortfolio()

  if (loading) return <Loader />

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-mono text-sm text-aurora-pink">Couldn't reach Supabase</p>
        <p className="max-w-sm text-sm text-ink-faint">{error}</p>
        <p className="max-w-sm text-xs text-ink-faint">
          Check your .env file and confirm the tables in supabase/schema.sql have been run.
        </p>
      </div>
    )
  }

  return (
    <MainLayout hero={hero}>
      <Hero hero={hero} />
      <About about={about} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact hero={hero} />
    </MainLayout>
  )
}
