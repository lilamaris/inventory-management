import { z } from 'zod'

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
})

export type User = z.infer<typeof userSchema>
