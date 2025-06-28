'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AuthType } from '@prisma/client'

import { createAccount, type CreateAccountParams, isUserHasAuthType } from '@/lib/server/account'
import { createSession, generateSessionToken } from '@/lib/server/session'
import { createUser, getUserByEmail } from '@/lib/server/user'
import { ActionState } from '@/lib/type'

import { signupSchema } from '@/features/signup/type'

export default async function signupAction(state: ActionState<typeof signupSchema>, formData: FormData) {
    const form = Object.fromEntries(formData)
    const validatedFields = signupSchema.safeParse(form)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '입력 항목이 올바르지 않습니다. 다시 확인해주세요.',
        }
    }

    const { email, password, name } = validatedFields.data

    const user = (await getUserByEmail(email)) || (await createUser(email, name))

    if (await isUserHasAuthType(AuthType.CREDENTIALS, user.id)) {
        return {
            message: '이미 사용 중인 이메일입니다.',
        }
    }

    const accountData: CreateAccountParams = {
        authType: AuthType.CREDENTIALS,
        userId: user.id,
        plainPassword: password,
    }

    await createAccount(accountData)

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
