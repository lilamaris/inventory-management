import { z } from 'zod'

import { Vendor, vendorSchema } from '@/features/vendor/dto.primitive'

import { itemSchema } from '@/features/item/dto.primitive'
import { managerSchema } from '@/features/manager/dto.primitive'
import { categorySchema } from '@/features/category/dto.primitive'
import { PrimitiveWithInclude } from '@/lib/type'

export const vendorWithItemSchema = vendorSchema.extend({
    items: z.array(itemSchema),
})

export const vendorWithManagerSchema = vendorSchema.extend({
    managers: z.array(managerSchema),
})

export const vendorWithCategorySchema = vendorSchema.extend({
    categories: z.array(categorySchema),
})

export type VendorWithItem = z.infer<typeof vendorWithItemSchema>
export type VendorWithManager = z.infer<typeof vendorWithManagerSchema>
export type VendorWithCategory = z.infer<typeof vendorWithCategorySchema>

interface IncludeMap {
    items: VendorWithItem
    managers: VendorWithManager
    categories: VendorWithCategory
}

export type VendorWith<Key extends (keyof IncludeMap)[]> = PrimitiveWithInclude<Vendor, IncludeMap, Key>
