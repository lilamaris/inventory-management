import { z } from 'zod'

export const itemSchema = z.object({
    id: z.string(),
    name: z.string(),
    sku: z.string(),
    description: z.string().optional(),
    quantity: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    category: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
    }),
    purchaseOrderCount: z.number().optional(),
    salesOrderCount: z.number().optional(),
})
