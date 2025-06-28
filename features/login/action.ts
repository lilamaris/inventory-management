'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { getPasswordHashByUserId } from '@/lib/server/account'
import { getUserByEmail } from '@/lib/server/user'
import { ActionState } from '@/lib/type'

import { loginSchema } from '@/features/login/type'
import { verifyPassword } from '@/lib/server/password'
import { createSession, generateSessionToken } from '@/lib/server/session'

const ERROR_MESSAGE = '입력 정보가 올바르지 않습니다. 다시 확인해주세요.'

export default async function loginAction(state: ActionState<typeof loginSchema>, formData: FormData) {
    const form = Object.fromEntries(formData)
    const validatedFields = loginSchema.safeParse(form)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: ERROR_MESSAGE,
        }
    }

    const { email, password } = validatedFields.data

    const user = await getUserByEmail(email)
    if (!user) return { message: ERROR_MESSAGE }

    const passwordHash =
        (await getPasswordHashByUserId(user.id)) ?? 'NotValidPasswordSoIUsingDefaultStringForProtectFromTimingAttack'
    const isValidPassword = await verifyPassword(passwordHash, password)
    if (!isValidPassword) return { message: ERROR_MESSAGE }

    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, user.id)
    ;(await cookies()).set('session', sessionToken, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: session.expiresAt,
    })

    return redirect('/console')
}
