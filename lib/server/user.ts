import prisma from '@/lib/prisma'
import { Role } from '@/generated/prisma'

export interface User {
    id: string
    email: string
    name: string
    avatarUrl: string | null
    emailVerifiedAt: Date | null
    roles: { role: Role }[]
}

export async function createUser(
    email: string,
    name: string,
    avatarUrl?: string,
    defaultRole: Role = Role.VIEWER,
): Promise<User> {
    const user = await prisma.user.create({
        data: {
            email,
            name,
            avatarUrl,
            roles: {
                create: { role: defaultRole },
            },
        },
        include: {
            roles: true,
        },
    })
    return user
}

export async function checkUserExistsByEmail(email: string): Promise<boolean> {
    const userCount = await prisma.user.count({ where: { email } })
    return userCount > 0
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            roles: true,
        },
    })
    return user
}

export async function updateUserName(userId: string, name: string): Promise<User> {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { name },
        include: {
            roles: true,
        },
    })
    return user
}

export async function updateUserAvatarUrl(userId: string, avatarUrl: string): Promise<User> {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { avatarUrl },
        include: {
            roles: true,
        },
    })
    return user
}
