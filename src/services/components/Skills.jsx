import { motion } from 'framer-motion'
import SkillCard from './SkillCard.jsx'

export default function Skills({ skills }) {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow mb-4"
      >
        $ ls ./skills
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mb-10 font-display text-3xl font-semibold text-ink sm:text-4xl"
      >
        Tools I reach for
      </motion.h2>

      {skills?.length ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  )
}

function EmptyState() {
  return (
    <div className="card-bento text-center text-ink-muted">
      No skills yet — add some from <span className="font-mono text-aurora-teal">/admin</span>.
    </div>
  )
}
