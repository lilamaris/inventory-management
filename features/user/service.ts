import { User } from '@/features/user/dto.primitive'
import prisma from '@/lib/prisma'

export async function getUser(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { id },
    })
    return user
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { email },
    })
    return user
}
