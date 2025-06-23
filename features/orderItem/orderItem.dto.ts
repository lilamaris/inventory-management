import { z } from 'zod'

export const orderItemSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    itemId: z.string(),
    orderId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type OrderItem = z.infer<typeof orderItemSchema>
