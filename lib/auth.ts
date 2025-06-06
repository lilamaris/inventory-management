import NextAuth, { DefaultSession } from 'next-auth'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import type { Provider } from 'next-auth/providers'

import { Role } from '@prisma/client'
import { prisma } from './prisma'
import { compare } from 'bcrypt'

declare module 'next-auth' {
    interface Session {
        user: {
            role?: Role
        } & DefaultSession['user']
    }
}

const CredentialsProvider = Credentials({
    credentials: {
        email: {},
        password: {},
    },
    authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
            throw new Error('Missing email or password')
        }
        if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
            throw new Error('Invalid email or password')
        }

        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            include: {
                Role: true,
            },
        })

        if (!user || !user.passwordHash) return null
        const pwMatch = await compare(credentials.password, user.passwordHash)

        if (!pwMatch) return null

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.Role,
        }
    },
})

const providers: Provider[] = [CredentialsProvider, Github]
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
})
