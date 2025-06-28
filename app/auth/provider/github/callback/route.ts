import type { OAuth2Tokens } from 'arctic'
import { cookies } from 'next/headers'

import { AuthType } from '@prisma/client'
import { createAccount, getAccountByProviderId } from '@/lib/server/account'
import { createSession, generateSessionToken } from '@/lib/server/session'
import { createUser, getUserByEmail } from '@/lib/server/user'
import github, { getUser, getUserEmail } from '@/lib/server/oauth-github'

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const cookieStore = await cookies()
    const storedState = cookieStore.get('github_oauth_state')?.value ?? null

    if (code === null || state === null || storedState === null) return new Response('Invalid Request', { status: 400 })
    if (state !== storedState) return new Response('Invalid State', { status: 400 })

    let tokens: OAuth2Tokens

    try {
        tokens = await github.validateAuthorizationCode(code)
    } catch {
        return new Response('Invalid Code', { status: 400 })
    }
    const githubAccessToken = tokens.accessToken()
    const providerUser = await getUser(githubAccessToken)

    const account = await getAccountByProviderId(providerUser.userId.toString(), AuthType.GITHUB)

    let userId: string
    if (!account) {
        const githubUserEmail = await getUserEmail(githubAccessToken)
        if (!githubUserEmail) return new Response('Invalid Email', { status: 400 })

        const user = (await getUserByEmail(githubUserEmail)) || (await createUser(githubUserEmail, providerUser.name))

        await createAccount({
            authType: AuthType.GITHUB,
            userId: user.id,
            providerId: providerUser.userId.toString(),
        })

        userId = user.id
    } else {
        userId = account.userId
    }

    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, userId)
    cookieStore.set('session', sessionToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: session.expiresAt,
    })

    return new Response(null, { status: 302, headers: { Location: '/console' } })
}
