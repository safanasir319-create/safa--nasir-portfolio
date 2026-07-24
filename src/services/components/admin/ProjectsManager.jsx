import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import { addProject, updateProject, deleteProject } from '../../services/api.js'

const EMPTY = { title: '', description: '', tech_stack: '', github_link: '', live_demo: '', image: '' }

export default function ProjectsManager({ projects }) {
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const startEdit = (project) => {
    setEditingId(project.id)
    setForm({
      title: project.title || '',
      description: project.description || '',
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : project.tech_stack || '',
      github_link: project.github_link || '',
      live_demo: project.live_demo || '',
      image: project.image || '',
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(EMPTY)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    const payload = {
      ...form,
      tech_stack: form.tech_stack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }
    try {
      if (editingId) {
        await updateProject(editingId, payload)
      } else {
        await addProject(payload)
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
    if (!window.confirm('Delete this project?')) return
    try {
      await deleteProject(id)
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
            {editingId ? 'Edit project' : 'Add project'}
          </h3>
          {editingId && (
            <button type="button" onClick={resetForm} className="flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-ink">
              <FiX /> cancel
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
          <Field label="Image URL" name="image" value={form.image} onChange={handleChange} />
        </div>

        <div>
          <label className="label-field">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="input-field resize-none"
          />
        </div>

        <Field
          label="Tech stack (comma separated)"
          name="tech_stack"
          value={form.tech_stack}
          onChange={handleChange}
          placeholder="React, Supabase, Tailwind"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="GitHub link" name="github_link" value={form.github_link} onChange={handleChange} />
          <Field label="Live demo link" name="live_demo" value={form.live_demo} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-primary" disabled={status === 'saving'}>
          <FiPlus /> {editingId ? 'Update project' : 'Add project'}
        </button>
      </motion.form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AnimatePresence>
          {projects?.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass flex items-center justify-between rounded-xl px-4 py-3"
            >
              <div className="pr-2">
                <p className="font-medium text-ink">{project.title}</p>
                <p className="line-clamp-1 font-mono text-[11px] text-ink-faint">{project.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => startEdit(project)} className="rounded-lg p-2 text-ink-muted transition hover:bg-white/5 hover:text-aurora-teal">
                  <FiEdit2 size={14} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="rounded-lg p-2 text-ink-muted transition hover:bg-white/5 hover:text-aurora-pink">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!projects?.length && <p className="font-mono text-xs text-ink-faint">No projects yet.</p>}
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
