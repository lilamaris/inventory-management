import { z } from 'zod'

import { ActionState } from '@/lib/type'

export const loginSchema = z.object({
    email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
    password: z.string().min(1, { message: '비밀번호는 필수 입력 항목입니다.' }),
})

export type LoginState = ActionState<typeof loginSchema>
