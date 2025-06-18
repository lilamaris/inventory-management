import prisma from '@/lib/prisma'
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

export function validateSessionToken(token: string): SessionValidateResult {}
