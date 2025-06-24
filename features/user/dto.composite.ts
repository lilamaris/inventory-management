import { z } from 'zod'

import { User, userSchema } from '@/features/user/dto.primitive'
import { PrimitiveWithInclude } from '@/lib/type'

import { orderSchema } from '@/features/order/dto.primitive'
import { orderTransactionSchema } from '@/features/orderTransaction/dto.primitive'
import { managerSchema } from '@/features/manager/dto.primitive'

export const userWithOrderSchema = userSchema.extend({
    orders: z.array(orderSchema),
})

export const userWithOrderTransactionSchema = userSchema.extend({
    orderTransactions: z.array(orderTransactionSchema),
})

export const userWithManagerSchema = userSchema.extend({
    manager: managerSchema,
})

export type UserWithOrder = z.infer<typeof userWithOrderSchema>
export type UserWithOrderTransaction = z.infer<typeof userWithOrderTransactionSchema>
export type UserWithManager = z.infer<typeof userWithManagerSchema>

interface IncludeMap {
    order: UserWithOrder
    orderTransaction: UserWithOrderTransaction
    manager: UserWithManager
}

export type UserWith<Key extends (keyof IncludeMap)[]> = PrimitiveWithInclude<User, IncludeMap, Key>
