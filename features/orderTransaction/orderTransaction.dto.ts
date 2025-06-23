import { z } from 'zod'
import { OrderStatus } from '@/generated/prisma'

export const orderTransactionSchema = z.object({
    id: z.string(),
    transactionAt: z.date(),
    orderId: z.string(),
    previousStatus: z.nativeEnum(OrderStatus),
    status: z.nativeEnum(OrderStatus),
    updatedManagerId: z.string(),
})

export type OrderTransaction = z.infer<typeof orderTransactionSchema>
