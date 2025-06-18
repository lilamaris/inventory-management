import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/lib/server/session'

export default async function Page() {
    const { session } = await getCurrentSession()

    if (session === null) redirect('/auth/login')

    return <div>Hello World</div>
}
