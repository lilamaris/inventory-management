import { PrismaClient } from '@/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'event',
                level: 'error',
            },
            {
                emit: 'event',
                level: 'info',
            },
            {
                emit: 'event',
                level: 'warn',
            },
        ],
    }).$extends(withAccelerate())

// 쿼리 로깅 이벤트 리스너
prisma.$on('query', (e: any) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
