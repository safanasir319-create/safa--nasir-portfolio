import { supabase } from '../supabase/supabaseClient'

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

export async function getHero() {
  const { data, error } = await supabase.from('hero').select('*').limit(1).maybeSingle()
  if (error) throw error
  return data
}

export async function upsertHero(hero) {
  const payload = { id: hero.id || 1, ...hero }
  const { data, error } = await supabase.from('hero').upsert(payload).select().single()
  if (error) throw error
  return data
}

/* -------------------------------------------------------------------------- */
/*  ABOUT                                                                     */
/* -------------------------------------------------------------------------- */

export async function getAbout() {
  const { data, error } = await supabase.from('about').select('*').limit(1).maybeSingle()
  if (error) throw error
  return data
}

export async function upsertAbout(about) {
  const payload = { id: about.id || 1, ...about }
  const { data, error } = await supabase.from('about').upsert(payload).select().single()
  if (error) throw error
  return data
}

/* -------------------------------------------------------------------------- */
/*  SKILLS                                                                    */
/* -------------------------------------------------------------------------- */

export async function getSkills() {
  const { data, error } = await supabase.from('skills').select('*').order('id', { ascending: true })
  if (error) throw error
  return data
}

export async function addSkill(skill) {
  const { data, error } = await supabase.from('skills').insert(skill).select().single()
  if (error) throw error
  return data
}

export async function updateSkill(id, skill) {
  const { data, error } = await supabase.from('skills').update(skill).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteSkill(id) {
  const { error } = await supabase.from('skills').delete().eq('id', id)
  if (error) throw error
  return true
}

/* -------------------------------------------------------------------------- */
/*  PROJECTS                                                                  */
/* -------------------------------------------------------------------------- */

export async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true })
  if (error) throw error
  return data
}

export async function addProject(project) {
  const { data, error } = await supabase.from('projects').insert(project).select().single()
  if (error) throw error
  return data
}

export async function updateProject(id, project) {
  const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
  return true
}
