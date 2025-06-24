import { z } from 'zod'

import { Category, categorySchema } from '@/features/category/dto.primitive'

import { vendorSchema } from '@/features/vendor/dto.primitive'
import { itemSchema } from '@/features/item/dto.primitive'
import { PrimitiveWithInclude } from '@/lib/type'

export const categoryWithVendorSchema = categorySchema.extend({
    vendor: vendorSchema,
})

export const categoryWithItemsSchema = categorySchema.extend({
    items: z.array(itemSchema),
})

export type CategoryWithVendor = z.infer<typeof categoryWithVendorSchema>
export type CategoryWithItems = z.infer<typeof categoryWithItemsSchema>

export interface IncludeMap {
    vendor: true
    items: true
}
export type CategoryWith<Key extends (keyof IncludeMap)[]> = PrimitiveWithInclude<Category, IncludeMap, Key>
