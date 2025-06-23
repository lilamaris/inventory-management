import { getCurrentSession, invalidateSession } from '@/lib/server/session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
    const { session } = await getCurrentSession()

    if (session === null) return redirect('/auth/login')

    const cookieStore = await cookies()
    cookieStore.delete('session_token')
    await invalidateSession(session.id)
    return redirect('/auth/login')
}
