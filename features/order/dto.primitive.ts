import { z } from 'zod'
import { OrderStatus } from '@prisma/client'

export const orderSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    orderByUserId: z.string(),
    vendorId: z.string(),
    status: z.nativeEnum(OrderStatus),
})

export type Order = z.infer<typeof orderSchema>
