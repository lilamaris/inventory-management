import { z } from 'zod'
import { orderSchema as primitiveOrderSchema } from '@/features/order/order.dto'
import { orderItemSchema as primitiveOrderItemSchema } from '@/features/orderItem/orderItem.dto'
import { vendorSchema } from '@/features/vendor/vendor.dto'
import { userSchema } from '@/features/user/user.dto'
import { itemSchema } from '../item/item.dto'

export const orderItemSchema = primitiveOrderItemSchema.extend({
    item: itemSchema,
})

export const userOrderSchema = primitiveOrderSchema.extend({
    vendor: vendorSchema,
    orderItems: z.array(orderItemSchema),
})

export const vendorOrderSchema = primitiveOrderSchema.extend({
    orderByUser: userSchema,
    orderItems: z.array(orderItemSchema),
})

export type OrderItem = z.infer<typeof orderItemSchema>
export type UserOrder = z.infer<typeof userOrderSchema>
export type VendorOrder = z.infer<typeof vendorOrderSchema>
