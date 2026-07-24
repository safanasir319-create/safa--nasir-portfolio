import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import { addSkill, updateSkill, deleteSkill } from '../../services/api.js'

const EMPTY = { name: '', category: '', icon: '', proficiency: 70 }

export default function SkillsManager({ skills }) {
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'proficiency' ? Number(value) : value }))
  }

  const startEdit = (skill) => {
    setEditingId(skill.id)
    setForm({ name: skill.name, category: skill.category, icon: skill.icon, proficiency: skill.proficiency })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(EMPTY)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    try {
      if (editingId) {
        await updateSkill(editingId, form)
      } else {
        await addSkill(form)
      }
      setStatus('saved')
      resetForm()
      setTimeout(() => setStatus('idle'), 1500)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    try {
      await deleteSkill(id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="card-bento space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">
            {editingId ? 'Edit skill' : 'Add skill'}
          </h3>
          {editingId && (
            <button type="button" onClick={resetForm} className="flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-ink">
              <FiX /> cancel
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} placeholder="React" required />
          <Field label="Category" name="category" value={form.category} onChange={handleChange} placeholder="Frontend" />
          <Field
            label="Icon (react-icons name)"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="SiReact"
          />
          <div>
            <label className="label-field">Proficiency ({form.proficiency}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              name="proficiency"
              value={form.proficiency}
              onChange={handleChange}
              className="w-full accent-aurora-teal"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={status === 'saving'}>
          <FiPlus /> {editingId ? 'Update skill' : 'Add skill'}
        </button>
      </motion.form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AnimatePresence>
          {skills?.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass flex items-center justify-between rounded-xl px-4 py-3"
            >
              <div>
                <p className="font-medium text-ink">{skill.name}</p>
                <p className="font-mono text-[11px] text-ink-faint">
                  {skill.category} · {skill.proficiency}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(skill)} className="rounded-lg p-2 text-ink-muted transition hover:bg-white/5 hover:text-aurora-teal">
                  <FiEdit2 size={14} />
                </button>
                <button onClick={() => handleDelete(skill.id)} className="rounded-lg p-2 text-ink-muted transition hover:bg-white/5 hover:text-aurora-pink">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!skills?.length && <p className="font-mono text-xs text-ink-faint">No skills yet.</p>}
      </div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="label-field">{label}</label>
      <input {...props} className="input-field" />
    </div>
  )
}
