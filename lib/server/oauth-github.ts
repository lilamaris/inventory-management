import { GitHub } from 'arctic'
import { ObjectParser } from '@pilcrowjs/object-parser'

const appBaseUrl = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_APP_USR : 'http://localhost:3000'
const githubCallbackUrl = `${appBaseUrl}/auth/provider/github/callback`

export default new GitHub(process.env.GITHUB_CLIENT_ID ?? '', process.env.GITHUB_CLIENT_SECRET ?? '', githubCallbackUrl)

export async function getUser(githubAccessToken: string) {
    const request = new Request('https://api.github.com/user')
    request.headers.set('Authorization', `Bearer ${githubAccessToken}`)
    const response = await fetch(request)
    const user: unknown = await response.json()
    const parser = new ObjectParser(user)

    const githubUserId = parser.getNumber('id')
    const githubUserName = parser.getString('login')
    const avatarUrl = parser.getString('avatar_url')

    return {
        userId: githubUserId,
        name: githubUserName,
        avatarUrl,
    }
}

export async function getUserEmail(githubAccessToken: string) {
    const request = new Request('https://api.github.com/user/emails')
    request.headers.set('Authorization', `Bearer ${githubAccessToken}`)
    const response = await fetch(request)
    const emails: unknown = await response.json()

    if (!Array.isArray(emails) || emails.length === 0) return null

    const validEmail = emails.find((email) => {
        const parser = new ObjectParser(email)
        const isEmailVerified = parser.getBoolean('verified')
        const isEmailPrimary = parser.getBoolean('primary')

        return isEmailPrimary && isEmailVerified
    })

    return validEmail?.email ?? null
}
