import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import * as SiIcons from 'react-icons/si'
import { FiCode } from 'react-icons/fi'

function resolveIcon(name) {
  if (!name) return FiCode
  return FiIcons[name] || SiIcons[name] || FiCode
}

export default function SkillCard({ skill, index }) {
  const Icon = resolveIcon(skill.icon)
  const proficiency = Math.max(0, Math.min(100, skill.proficiency ?? 0))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="card-bento group"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-xl text-aurora-teal transition-colors group-hover:bg-aurora-teal/10">
          <Icon />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">{skill.category}</span>
      </div>

      <h4 className="mt-4 font-display text-lg font-medium text-ink">{skill.name}</h4>

      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full bg-gradient-to-r from-aurora-violet via-aurora-teal to-aurora-pink"
          />
        </div>
        <p className="mt-1.5 font-mono text-[11px] text-ink-faint">{proficiency}%</p>
      </div>
    </motion.div>
  )
}
