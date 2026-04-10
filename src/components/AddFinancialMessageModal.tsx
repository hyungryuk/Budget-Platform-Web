'use client'

import { useActionState, useEffect, useState } from 'react'
import { addFinancialMessage } from '@/app/dashboard/actions'

export function AddFinancialMessageModal() {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(addFinancialMessage, {})

  // Close modal on success
  useEffect(() => {
    if (state.success) {
      const t = setTimeout(() => setOpen(false), 800)
      return () => clearTimeout(t)
    }
  }, [state.success])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        + Add Message
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-gray-900">Log Financial Message</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Paste the notification from your bank or card company.
            </p>

            <form action={action}>
              <textarea
                name="text"
                rows={4}
                placeholder="e.g. Your card ending in 4567 was charged $50.00 at Amazon on Apr 11."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              {state.error && (
                <p className="mt-2 text-xs text-red-600">{state.error}</p>
              )}
              {state.success && (
                <p className="mt-2 text-xs text-green-600">Saved!</p>
              )}

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {pending ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
