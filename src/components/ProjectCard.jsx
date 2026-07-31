import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  const techStack = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : (project.tech_stack || '').split(',').map(t => t.trim()).filter(Boolean)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="glass-card group flex flex-col overflow-hidden rounded-2xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-aurora-violet/10 to-aurora-teal/5">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FiCode size={32} className="text-ink-faint/40" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

        {/* Hover overlay links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-void/80 border border-white/15 text-ink backdrop-blur-sm transition hover:bg-aurora-violet hover:border-aurora-violet">
              <FiGithub size={17} />
            </a>
          )}
          {project.live_demo && (
            <a href={project.live_demo} target="_blank" rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-void/80 border border-white/15 text-ink backdrop-blur-sm transition hover:bg-aurora-teal hover:border-aurora-teal hover:text-void">
              <FiExternalLink size={17} />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>

        {techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {techStack.map(tech => (
              <span key={tech}
                className="rounded-full border border-aurora-violet/15 bg-aurora-violet/6 px-2.5 py-0.5 font-mono text-[10px] text-aurora-teal/80">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-ink-muted transition hover:text-aurora-teal">
              <FiGithub size={13} /> Code
            </a>
          )}
          {project.live_demo && (
            <a href={project.live_demo} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-ink-muted transition hover:text-aurora-violet">
              <FiExternalLink size={13} /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
