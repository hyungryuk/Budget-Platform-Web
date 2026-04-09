import { createClient } from '@/lib/supabase/server'
import { signout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Budget Platform</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <form action={signout}>
            <button
              type="submit"
              className="text-sm text-red-600 hover:underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-gray-500">Your budget overview will appear here.</p>
      </main>
    </div>
  )
}
