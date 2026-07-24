import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { upsertAbout } from '../../services/api.js'

export default function AboutForm({ about }) {
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    setDescription(about?.description || '')
  }, [about])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    try {
      await upsertAbout({ id: about?.id, description })
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
      <h3 className="font-display text-xl font-semibold text-ink">About</h3>
      <div>
        <label className="label-field">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className="input-field resize-none"
          placeholder="Tell visitors who you are and what you build…"
        />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
        {status === 'saved' && <span className="font-mono text-xs text-aurora-teal">Saved ✓</span>}
        {status === 'error' && <span className="font-mono text-xs text-aurora-pink">Failed to save</span>}
      </div>
    </motion.form>
  )
}
