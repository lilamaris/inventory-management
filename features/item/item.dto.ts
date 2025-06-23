import { z } from 'zod'

export const itemSchema = z.object({
    id: z.string(),
    sku: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    quantity: z.number(),
    price: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    categoryId: z.string(),
    vendorId: z.string(),
})

export type Item = z.infer<typeof itemSchema>
