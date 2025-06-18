import { deleteSessionTokenCookie, getCurrentSession, invalidateSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

export async function GET() {
    const { session } = await getCurrentSession()

    if (session === null) return redirect('/auth/login')

    await invalidateSession(session.id)
    await deleteSessionTokenCookie()
    return redirect('/auth/login')
}
