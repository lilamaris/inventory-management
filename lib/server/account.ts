import { Account, AuthType } from '@/generated/prisma'

import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/server/password'

interface CommonAccountFields {
    userId: string
}

interface CredentialsAccountParams extends CommonAccountFields {
    authType: typeof AuthType.CREDENTIALS
    plainPassword: string
    providerId?: never
}

interface OAuthAccountParams extends CommonAccountFields {
    authType: Exclude<AuthType, typeof AuthType.CREDENTIALS>
    plainPassword?: never
    providerId: string
}

export type CreateAccountParams = CredentialsAccountParams | OAuthAccountParams

export function createAccount(params: CredentialsAccountParams): Promise<Account>
export function createAccount(params: OAuthAccountParams): Promise<Account>

export async function createAccount(params: CreateAccountParams) {
    let passwordHash: string | null = null
    let providerId: string

    if (params.authType === AuthType.CREDENTIALS) {
        passwordHash = await hashPassword(params.plainPassword)
        providerId = params.userId
    } else {
        providerId = params.providerId
    }

    const accountData = {
        authType: params.authType,
        userId: params.userId,
        providerId,
        passwordHash,
    }

    const account = await prisma.account.create({ data: accountData })
    return account
}

export async function isUserHasAuthType(authType: AuthType, userId: string) {
    const authCount = await prisma.account.count({ where: { authType, userId } })
    return authCount > 0
}
