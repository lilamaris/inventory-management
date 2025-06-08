import NextAuth, { DefaultSession, NextAuthConfig } from 'next-auth'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import type { Provider } from 'next-auth/providers'

import { Role } from '@prisma/client'
import { prisma } from './prisma'
import { compare } from 'bcrypt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getUserAuthByEmail, isExistingUser } from './service/uesr'

declare module 'next-auth' {
    interface Session {
        user: {
            role?: Role
        } & DefaultSession['user']
    }
}

const CredentialsProvider = Credentials({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '********' },
    },
    authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null
        const user = await getUserAuthByEmail(credentials.email as string)
        if (!user || !user.passwordHash) return null
        const pwMatch = await compare(credentials.password as string, user.passwordHash)
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
const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    providers,
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
            }

            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

export const providerMap = [
    ...providers
        .map((provider) => {
            if (typeof provider === 'function') {
                const providerData = provider()
                return { id: providerData.id, name: providerData.name }
            }
            return { id: provider.id, name: provider.name }
        })
        .filter((provider) => provider.id !== 'credentials'),
] as const
