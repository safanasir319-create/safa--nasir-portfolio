import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import Loader from '../components/Loader.jsx'
import HeroForm from '../components/admin/HeroForm.jsx'
import AboutForm from '../components/admin/AboutForm.jsx'
import SkillsManager from '../components/admin/SkillsManager.jsx'
import ProjectsManager from '../components/admin/ProjectsManager.jsx'

export default function Admin() {
  const { hero, about, skills, projects, loading } = usePortfolio()
  const [tab, setTab] = useState('hero')

  if (loading) return <Loader label="Loading dashboard" />

  return (
    <AdminLayout active={tab} onChange={setTab}>
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wide text-aurora-teal">$ /admin</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Content dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Changes save straight to Supabase and sync to the live site instantly.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'hero' && <HeroForm hero={hero} />}
          {tab === 'about' && <AboutForm about={about} />}
          {tab === 'skills' && <SkillsManager skills={skills} />}
          {tab === 'projects' && <ProjectsManager projects={projects} />}
        </motion.div>
      </AnimatePresence>
    </AdminLayout>
  )
}
