import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import * as SiIcons from 'react-icons/si'
import { FiCode } from 'react-icons/fi'

function resolveIcon(name) {
  if (!name) return FiCode
  return FiIcons[name] || SiIcons[name] || FiCode
}

const COLORS = [
  { bg: 'bg-aurora-violet/10', border: 'border-aurora-violet/15', text: 'text-aurora-violet', bar: 'from-aurora-violet to-aurora-indigo' },
  { bg: 'bg-aurora-teal/10', border: 'border-aurora-teal/15', text: 'text-aurora-teal', bar: 'from-aurora-teal to-aurora-violet' },
  { bg: 'bg-aurora-pink/10', border: 'border-aurora-pink/15', text: 'text-aurora-pink', bar: 'from-aurora-pink to-aurora-violet' },
  { bg: 'bg-aurora-amber/10', border: 'border-aurora-amber/15', text: 'text-aurora-amber', bar: 'from-aurora-amber to-aurora-pink' },
]

export default function SkillCard({ skill, index }) {
  const Icon = resolveIcon(skill.icon)
  const proficiency = Math.max(0, Math.min(100, skill.proficiency ?? 0))
  const color = COLORS[index % COLORS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 8) * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="card-bento group cursor-default"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${color.bg} ${color.border} text-lg ${color.text} transition-transform group-hover:scale-110`}>
          <Icon />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">{skill.category}</span>
      </div>

      <h4 className="mt-4 font-display text-base font-semibold text-ink">{skill.name}</h4>

      <div className="mt-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className={`h-full rounded-full bg-gradient-to-r ${color.bar}`}
          />
        </div>
        <p className="mt-1.5 font-mono text-[10px] text-ink-faint">{proficiency}%</p>
      </div>
    </motion.div>
  )
}
