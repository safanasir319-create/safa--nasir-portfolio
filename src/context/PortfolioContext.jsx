import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getHero, getAbout, getSkills, getProjects } from '../services/api'
import { useRealtimeTable } from '../hooks/useRealtimeTable'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [hero, setHero] = useState(null)
  const [about, setAbout] = useState(null)
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetchAll = useCallback(async () => {
    try {
      const [heroData, aboutData, skillsData, projectsData] = await Promise.all([
        getHero(),
        getAbout(),
        getSkills(),
        getProjects(),
      ])
      setHero(heroData)
      setAbout(aboutData)
      setSkills(skillsData || [])
      setProjects(projectsData || [])
      setError(null)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to load portfolio data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetchAll()
  }, [refetchAll])

  // Live sync: any admin write to these tables refetches instantly, so the
  // public site never needs a manual refresh.
  useRealtimeTable('hero', refetchAll)
  useRealtimeTable('about', refetchAll)
  useRealtimeTable('skills', refetchAll)
  useRealtimeTable('projects', refetchAll)

  const value = useMemo(
    () => ({ hero, about, skills, projects, loading, error, refetchAll }),
    [hero, about, skills, projects, loading, error, refetchAll]
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within a PortfolioProvider')
  return ctx
}
