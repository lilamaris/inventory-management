import 'server-only'

import { JWT } from 'next-auth/jwt'
import NextAuth, { DefaultSession, NextAuthConfig, User } from 'next-auth'
import type { Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { type Role } from '@prisma/client'
import { prisma } from './prisma'
import { compare } from 'bcrypt'

import { getUserAuthByEmail } from './service/user'

declare module 'next-auth/jwt' {
    interface JWT {
        role: string
    }
}

declare module 'next-auth' {
    interface User {
        roleId: string | null
    }
    interface Session {
        user: {
            role: string
        } & DefaultSession['user']
    }
}

export const verifyPermission = async (
    requestPerm: { domain?: string; resource: string; action: string },
    userRole: Role,
) => {
    const userRolePermissions = await prisma.rolePermission.findMany({
        where: { roleId: userRole.id },
        include: { permission: true },
    })

    const userPermissions = userRolePermissions.map((rolePermission) => rolePermission.permission)

    const hasPermission = userPermissions.some(
        (permission) =>
            permission.resource === requestPerm.resource &&
            permission.action === requestPerm.action &&
            (permission.domain === requestPerm.domain || !requestPerm.domain),
    )

    return hasPermission
}

const GithubProvider = Github({
    profile: async (profile): Promise<User> => {
        return {
            id: String(profile.id),
            name: profile.name,
            email: profile.email,
            image: profile.avatar_url,
            roleId: null,
        }
    },
})

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
            roleId: user.roleId,
        }
    },
})

const providers: Provider[] = [CredentialsProvider, GithubProvider]
const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    providers,
    callbacks: {
        authorized: async ({ auth, request }) => {
            return true
        },
        jwt: async ({ token, user, trigger }) => {
            if (trigger === 'signUp') {
                console.log('signUp trigger', token, user)
                if (!user) {
                    throw new Error('User not found while signUp Trigger.. fcking hate authjs')
                }
                const { id } = user as User
                const role = await prisma.role.findUnique({ where: { name: 'Employee' } })
                if (!role) return token
                await prisma.user.update({ where: { id }, data: { roleId: role.id } })
                token.role = role.name
                return token
            }

            if (trigger === 'signIn') {
                console.log('signIn trigger', token, user)
                if (!user) {
                    throw new Error('User not found while signUp Trigger.. fcking hate authjs')
                }
                const { id } = user as User
                const role = await prisma.role.findUnique({ where: { name: 'Employee' } })
                if (!role) return token
                await prisma.user.update({ where: { id }, data: { roleId: role.id } })
                token.role = role.name
            }

            return token
        },
        session: async ({ session, token }) => {
            session.user.role = token.role
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
