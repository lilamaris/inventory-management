import { prisma } from '@/lib/prisma'

export const isExistingUser = async (email: string) => {
    const count = await prisma.user.count({ where: { email } })
    return count > 0
}

export const getUserAuthByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
        include: { role: true },
    })
}
