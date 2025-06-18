import { z } from 'zod'

import { ActionState } from '@/lib/type'

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

export type LoginState = ActionState<typeof loginSchema>
