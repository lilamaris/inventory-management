import { z } from 'zod'

export const vendorSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type Vendor = z.infer<typeof vendorSchema>
