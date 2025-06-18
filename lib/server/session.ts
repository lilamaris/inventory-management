import prisma from '@/lib/prisma'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { cookies } from 'next/headers'
import { cache } from 'react'

import type { User } from '@/lib/server/user'

type SessionValidateResult =
    | {
          user: User
          session: Session
      }
    | {
          user: null
          session: null
      }

export interface Session {
    id: string
    expiresAt: Date
    userId: string
}

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 15 // 15 days
const SESSION_COOKIE_NAME = 'session'
const VOID_STRING = ''

export async function invalidateSession(sessionId: string) {
    await prisma.session.delete({ where: { id: sessionId } })
}

export async function invalidateUserSessions(userId: string) {
    await prisma.session.deleteMany({ where: { userId } })
}

export async function setSessionTokenToCookie(token: string, expiresAt: Date): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
    })
}

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, VOID_STRING, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0),
    })
}

export function generateSessionToken(): string {
    const tokenBytes = new Uint8Array(32)
    crypto.getRandomValues(tokenBytes)
    const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase()
    return token
}

export async function validateSessionToken(token: string): Promise<SessionValidateResult> {
    const now = Date.now()
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
            user: true,
        },
    })

    if (!session) return { user: null, session: null }
    if (now > session.expiresAt.getTime()) {
        await invalidateSession(sessionId)
        return { user: null, session: null }
    }

    if (session.expiresAt.getTime() - now < SESSION_EXPIRATION_TIME) {
        await prisma.session.update({
            where: { id: sessionId },
            data: { expiresAt: new Date(now + SESSION_EXPIRATION_TIME) },
        })
    }

    return { user: session.user as unknown as User, session }
}

export const getCurrentSession = cache(async (): Promise<SessionValidateResult> => {
    const token = (await cookies()).get('session')?.value ?? null
    if (!token) return { user: null, session: null }
    return validateSessionToken(token)
})

export async function createSession(token: string, userId: string): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session = await prisma.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt: new Date(Date.now() + SESSION_EXPIRATION_TIME),
        },
    })

    return session
}
