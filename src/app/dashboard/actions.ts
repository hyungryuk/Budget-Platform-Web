'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type ActionState = { error?: string; success?: boolean }

export async function addFinancialMessage(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const text = (formData.get('text') as string)?.trim()
  if (!text) return { error: 'Message cannot be empty.' }

  const res = await fetch(`https://${process.env.BACKEND_HOST}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, created_by: user.email }),
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText)
    return { error: `Failed to save: ${msg}` }
  }

  return { success: true }
}
