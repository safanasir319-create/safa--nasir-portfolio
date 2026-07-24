import { useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'

/**
 * Subscribes to postgres_changes on `table` and invokes `onChange` for every
 * INSERT / UPDATE / DELETE event so the caller can refetch or patch state.
 * This is what makes the public portfolio update live when the admin
 * dashboard saves changes — no page refresh required.
 */
export function useRealtimeTable(table, onChange) {
  useEffect(() => {
    if (!table) return undefined

    const channel = supabase
      .channel(`realtime:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        onChange?.(payload)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])
}
