import { generateState } from 'arctic'
import { cookies } from 'next/headers'

import github from '@/lib/server/oauth-github'

export async function GET(): Promise<Response> {
    const state = generateState()
    const url = github.createAuthorizationURL(state, ['user:email'])

    const cookieStore = await cookies()
    cookieStore.set('github_oauth_state', state, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: 'lax',
    })

    return new Response(null, { status: 302, headers: { Location: url.toString() } })
}
