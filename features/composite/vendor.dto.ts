import { z } from 'zod'
import { vendorSchema as primitiveVendorSchema } from '@/features/vendor/dto.primitive'
import { itemSchema } from '@/features/item/dto.primitive'
import { managerSchema } from '@/features/manager/dto.primitive'
import { categorySchema } from '@/features/category/dto.primitive'

export const vendorSchema = primitiveVendorSchema.extend({
    items: z.array(itemSchema),
    managers: z.array(managerSchema),
    categories: z.array(categorySchema),
})

export type Vendor = z.infer<typeof vendorSchema>
