import { z } from 'zod'

export const managerSchema = z.object({
    id: z.string(),
    isOwner: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    vendorId: z.string(),
    userId: z.string(),
})

export type Manager = z.infer<typeof managerSchema>
