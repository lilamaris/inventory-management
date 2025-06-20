import { PurchaseOrderStatus } from '@/generated/prisma'

import { z } from 'zod'

export const orderItemSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    vendorItemId: z.string(),
    vendorItem: z.object({
        id: z.string(),
        name: z.string(),
    }),
})

export const orderSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    orderByUserId: z.string(),
    orderByUser: z.object({
        id: z.string(),
        name: z.string(),
    }),
    vendorId: z.string(),
    vendor: z.object({
        id: z.string(),
        name: z.string(),
    }),
    items: z.array(orderItemSchema),
    status: z.nativeEnum(PurchaseOrderStatus),
})

export type Order = z.infer<typeof orderSchema>
export type OrderItem = z.infer<typeof orderItemSchema>
