import { z } from 'zod'

import { Order, orderSchema } from '@/features/order/dto.primitive'
import { PrimitiveWithInclude, PrimitiveWithPartial } from '@/lib/type'

import { itemSchema } from '@/features/item/dto.primitive'
import { userSchema } from '@/features/user/dto.primitive'
import { vendorSchema } from '@/features/vendor/dto.primitive'
import { orderTransactionSchema } from '@/features/orderTransaction/dto.primitive'

export const orderItemSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    itemId: z.string(),
    orderId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    item: itemSchema,
})

export const orderWithOrderItemsSchema = orderSchema.extend({
    orderItems: z.array(orderItemSchema),
})

export const orderWithOrderByUserSchema = orderSchema.extend({
    orderByUser: userSchema,
})

export const orderWithVendorSchema = orderSchema.extend({
    vendor: vendorSchema,
})

export const orderWithOrderTransactionSchema = orderSchema.extend({
    orderTransactions: z.array(orderTransactionSchema),
})

export type OrderItem = z.infer<typeof orderItemSchema>
export type OrderWithOrderItems = z.infer<typeof orderWithOrderItemsSchema>
export type OrderWithOrderByUser = z.infer<typeof orderWithOrderByUserSchema>
export type OrderWithVendor = z.infer<typeof orderWithVendorSchema>
export type OrderWithOrderTransaction = z.infer<typeof orderWithOrderTransactionSchema>

interface IncludeMap {
    orderItems: OrderWithOrderItems
    orderByUser: OrderWithOrderByUser
    vendor: OrderWithVendor
    orderTransactions: OrderWithOrderTransaction
}

export type OrderWith<Key extends (keyof IncludeMap)[]> = PrimitiveWithInclude<Order, IncludeMap, Key>
export type OrderWithPartial<Key extends (keyof IncludeMap)[]> = PrimitiveWithPartial<Order, IncludeMap, Key>