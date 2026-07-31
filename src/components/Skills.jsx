import { motion } from 'framer-motion'
import SkillCard from './SkillCard.jsx'

export default function Skills({ skills }) {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="section-divider mb-16" />

      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow mb-3">
        Tech stack
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.05 }} className="section-title mb-12">
        Tools I <span className="text-gradient">reach for</span>
      </motion.h2>

      {skills?.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, i) => <SkillCard key={skill.id} skill={skill} index={i} />)}
        </div>
      ) : (
        <div className="card-bento py-12 text-center text-ink-muted">
          No skills yet — add some from <span className="font-mono text-aurora-teal">/admin</span>.
        </div>
      )}
    </section>
  )
}
