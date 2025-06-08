import { auth } from '@/lib/auth'
import Link from 'next/link'

export default async function Home() {
    const session = await auth()

    return (
        <>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            {session?.user ? <Link href="/auth/signout">SignOut</Link> : <Link href="/auth/signin">SignIn</Link>}
        </>
    )
}
