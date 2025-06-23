import { z } from 'zod'
import { vendorSchema as primitiveVendorSchema } from '@/features/vendor/vendor.dto'
import { itemSchema } from '@/features/item/item.dto'
import { managerSchema } from '@/features/manager/manager.dto'
import { categorySchema } from '@/features/category/category.dto'

export const vendorSchema = primitiveVendorSchema.extend({
    items: z.array(itemSchema),
    managers: z.array(managerSchema),
    categories: z.array(categorySchema),
})

export type Vendor = z.infer<typeof vendorSchema>
