import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard.jsx'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="section-divider mb-16" />

      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow mb-3">
        Selected work
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.05 }} className="section-title mb-12">
        Things I've <span className="text-gradient">built</span>
      </motion.h2>

      {projects?.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      ) : (
        <div className="card-bento py-16 text-center text-ink-muted">
          No projects yet — add some from <span className="font-mono text-aurora-teal">/admin</span>.
        </div>
      )}
    </section>
  )
}
