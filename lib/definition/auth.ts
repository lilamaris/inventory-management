import 'server-only'
import { z } from 'zod'

export const signInCredentialsSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }).trim(),
    password: z.string().trim(),
})

export const signUpCredentialsSchema = z
    .object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters' }).trim(),
        email: z.string().email({ message: 'Please enter a valid email address' }).trim(),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
            .regex(/[0-9]/, { message: 'Contain at least one number' })
            .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character' })
            .trim(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type SignInCredentialsState =
    | {
          errors?: { email?: string[]; password?: string[] }
          payload?: { email?: string }
          message?: string
      }
    | undefined

export type SignUpCredentialsState =
    | {
          errors?: { name?: string[]; email?: string[]; password?: string[]; confirmPassword?: string[] }
          payload?: { name?: string; email?: string }
          message?: string
      }
    | undefined
