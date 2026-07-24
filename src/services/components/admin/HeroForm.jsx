import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { upsertHero } from '../../services/api.js'

const EMPTY = {
  name: '',
  title: '',
  subtitle: '',
  resume: '',
  profile_image: '',
  email: '',
  github: '',
  linkedin: '',
  twitter: '',
  location: '',
}

export default function HeroForm({ hero }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (hero) setForm({ ...EMPTY, ...hero })
  }, [hero])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    try {
      await upsertHero(form)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 1800)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="card-bento space-y-5"
    >
      <h3 className="font-display text-xl font-semibold text-ink">Hero &amp; contact</h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" value={form.name} onChange={handleChange} />
        <Field label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Full-Stack Developer" />
      </div>

      <div>
        <label className="label-field">Subtitle / intro</label>
        <textarea
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          rows={3}
          className="input-field resize-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Resume URL" name="resume" value={form.resume} onChange={handleChange} />
        <Field label="Profile image URL" name="profile_image" value={form.profile_image} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" value={form.email} onChange={handleChange} />
        <Field label="Location" name="location" value={form.location} onChange={handleChange} />
        <Field label="GitHub URL" name="github" value={form.github} onChange={handleChange} />
        <Field label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={handleChange} />
        <Field label="Twitter / X URL" name="twitter" value={form.twitter} onChange={handleChange} />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" className="btn-primary" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
        {status === 'saved' && <span className="font-mono text-xs text-aurora-teal">Saved ✓</span>}
        {status === 'error' && <span className="font-mono text-xs text-aurora-pink">Failed to save</span>}
      </div>
    </motion.form>
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
