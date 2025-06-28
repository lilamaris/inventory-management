import { z } from 'zod'

import { ActionState } from '@/lib/type'

export const signupSchema = z
    .object({
        email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
        name: z
            .string()
            .min(1, { message: '이름은 필수 입력 항목입니다.' })
            .max(20, { message: '이름은 20자 이하여야 합니다.' }),
        password: z
            .string()
            .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
            .regex(/[A-Z]/, { message: '대문자를 포함해야 합니다.' })
            .regex(/[a-z]/, { message: '소문자를 포함해야 합니다.' })
            .regex(/[0-9]/, { message: '숫자를 포함해야 합니다.' })
            .regex(/[!@#$%^&*]/, { message: '특수문자를 포함해야 합니다.' }),
        confirmPassword: z.string().min(1, { message: '비밀번호 확인은 필수 입력 항목입니다.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다.',
    })

export type SignupState = ActionState<typeof signupSchema>
