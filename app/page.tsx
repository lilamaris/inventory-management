import Link from 'next/link'

import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

export default async function Page() {
    const { session, user } = await getCurrentSession()

    return (
        <main>
            <h1>Home</h1>
            <p>Welcome, {user?.name ?? 'Guest'}</p>
        </main>
    )
}
