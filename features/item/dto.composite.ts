import { z } from 'zod'

import { Item, itemSchema } from '@/features/item/dto.primitive'
import { PrimitiveWithInclude } from '@/lib/type'

import { categorySchema } from '@/features/category/dto.primitive'
import { vendorSchema } from '@/features/vendor/dto.primitive'
import { orderItemSchema } from '../order/dto.primitive'

export const itemWithCategorySchema = itemSchema.extend({
    category: categorySchema,
})

export const itemWithVendorSchema = itemSchema.extend({
    vendor: vendorSchema,
})

export const itemWithOrderItemsSchema = itemSchema.extend({
    orderItems: z.array(orderItemSchema),
})

export type ItemWithCategory = z.infer<typeof itemWithCategorySchema>
export type ItemWithVendor = z.infer<typeof itemWithVendorSchema>
export type ItemWithOrderItems = z.infer<typeof itemWithOrderItemsSchema>

interface IncludeMap {
    category: ItemWithCategory
    vendor: ItemWithVendor
    orderItems: ItemWithOrderItems
}

export type ItemWith<Key extends (keyof IncludeMap)[]> = PrimitiveWithInclude<Item, IncludeMap, Key>
