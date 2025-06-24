import { z } from 'zod'

import { OrderTransaction, orderTransactionSchema } from '@/features/orderTransaction/dto.primitive'
import { PrimitiveWithInclude } from '@/lib/type'

import { orderSchema } from '@/features/order/dto.primitive'
import { userSchema } from '@/features/user/dto.primitive'

export const orderTransactionWithOrderSchema = orderTransactionSchema.extend({
    order: orderSchema,
})

export const orderTransactionWithUpdatedByUserSchema = orderTransactionWithOrderSchema.extend({
    updatedByUser: userSchema,
})

export type OrderTransactionWithOrder = z.infer<typeof orderTransactionWithOrderSchema>
export type OrderTransactionWithUpdatedByUser = z.infer<typeof orderTransactionWithUpdatedByUserSchema>

interface IncludeMap {
    order: OrderTransactionWithOrder
    updatedByUser: OrderTransactionWithUpdatedByUser
}

export type OrderTransactionWith<Key extends (keyof IncludeMap)[]> = PrimitiveWithInclude<
    OrderTransaction,
    IncludeMap,
    Key
>
