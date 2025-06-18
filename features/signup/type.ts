import { ActionState } from '@/lib/type'
import { z } from 'zod'

export const signupSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email address' }),
        name: z
            .string()
            .min(1, { message: 'Name is required' })
            .max(20, { message: 'Name must be less than 20 characters' }),
        password: z
            .string()
            .min(8)
            .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
            .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
            .regex(/[0-9]/, { message: 'Must contain at least one number' })
            .regex(/[!@#$%^&*]/, { message: 'Must contain at least one special character' }),
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    })

export type SignupState = ActionState<typeof signupSchema>
