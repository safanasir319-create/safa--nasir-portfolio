import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard.jsx'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow mb-4"
      >
        $ git log --projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mb-10 font-display text-3xl font-semibold text-ink sm:text-4xl"
      >
        Selected work
      </motion.h2>

      {projects?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="card-bento text-center text-ink-muted">
          No projects yet — add some from <span className="font-mono text-aurora-teal">/admin</span>.
        </div>
      )}
    </section>
  )
}
