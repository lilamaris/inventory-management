'use server'

import { signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import {
    signInCredentialsSchema,
    SignInCredentialsState,
    signUpCredentialsSchema,
    SignUpCredentialsState,
} from '@/features/auth/types/auth'
import { AuthError } from 'next-auth'
import { isExistingUser } from '../../user/api/user'
import bcrypt from 'bcrypt'
import { prisma } from '../../../lib/prisma'

export const signInProviderAction = async (state: SignInCredentialsState, formData: FormData) => {
    const { provider, redirectTo } = Object.fromEntries(formData) as {
        provider: string
        redirectTo: string
    }
    try {
        await signIn(provider, { redirectTo: redirectTo || '/' })
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect('/auth/signin')
        }
        throw error
    }
}

export const signInCredentialsAction = async (state: SignInCredentialsState, formData: FormData) => {
    const { email, password, redirectTo } = Object.fromEntries(formData) as {
        redirectTo: string
        email: string
        password: string
    }

    const validatedFields = signInCredentialsSchema.safeParse({
        email,
        password,
    })

    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors, payload: { email } }

    try {
        await signIn('credentials', formData, { redirectTo: redirectTo || '/' })
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect('/auth/signin')
        }
        throw error
    }
}

export const signUpCredentialsAction = async (state: SignUpCredentialsState, formData: FormData) => {
    const formDataEntries = Object.fromEntries(formData) as {
        name: string
        email: string
        password: string
        confirmPassword: string
        redirectTo: string
    }

    const validatedFields = signUpCredentialsSchema.safeParse(formDataEntries)

    if (!validatedFields.success)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            payload: { name: formDataEntries.name, email: formDataEntries.email },
        }

    if (await isExistingUser(formData.get('email') as string)) {
        return {
            errors: { email: ['Email already exists'] },
            payload: { name: formDataEntries.name, email: formDataEntries.email },
        }
    }

    const { name, email, password } = validatedFields.data
    const role = await prisma.role.findUnique({ where: { name: 'Employee' } })

    const passwordHash = await bcrypt.hash(password, 10)
    const userData = {
        name,
        email,
        passwordHash,
        roleId: role?.id,
    }

    try {
        const user = await prisma.user.create({
            data: userData,
        })
        console.info('Created User: ', user)
    } catch (error) {
        console.error('Error creating user: ', error)
        return { message: 'Something went wrong. Please try again later.' }
    }

    redirect('/auth/signin')
}

export const signOutAction = async () => {
    await signOut()
    redirect('/auth/signin')
}
