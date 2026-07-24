import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  const techStack = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : (project.tech_stack || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8 }}
      className="glass group flex flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-glow"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-void-soft">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-ink-faint">
            no preview
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>

        {techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-aurora-teal/90"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-ink-muted transition hover:text-aurora-teal"
            >
              <FiGithub /> code
            </a>
          )}
          {project.live_demo && (
            <a
              href={project.live_demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-ink-muted transition hover:text-aurora-violet"
            >
              <FiExternalLink /> live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
