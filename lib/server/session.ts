import prisma from '@/lib/prisma'
import { sha256 } from '@oslojs/crypto/sha2'
import * as oslo_encoding from '@oslojs/encoding'
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
    createdAt: Date
    expiresAt: Date
    userId: string
}

const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 15 // 15 days

export async function invalidateSession(sessionId: string) {
    await prisma.session.delete({ where: { id: sessionId } })
}

export async function invalidateUserSessions(userId: string) {
    await prisma.session.deleteMany({ where: { userId } })
}

export function generateSessionToken(): string {
    const tokenBytes = new Uint8Array(32)
    crypto.getRandomValues(tokenBytes)
    const token = oslo_encoding.encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase()
    return token
}

export async function validateSessionToken(token: string): Promise<SessionValidateResult> {
    const now = Date.now()
    const sessionId = oslo_encoding.encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

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
    const sessionId = oslo_encoding.encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session = await prisma.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt: new Date(Date.now() + SESSION_EXPIRATION_TIME),
        },
    })

    return session
}
