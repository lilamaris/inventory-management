import { z } from 'zod'

const vendorItemRequiredSchema = z.object({
    vendorId: z.string(),
    sku: z.string(),
})

export const vendorItemMutableSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    description: z.string().nullable(),
    quantity: z.number().min(1, { message: 'Quantity must be greater than 0' }),
    price: z.number().min(1, { message: 'Price must be greater than 0' }),
})

export const listingSchema = vendorItemMutableSchema.extend({
    ...vendorItemRequiredSchema.shape,
})

export const updateListingSchema = vendorItemMutableSchema.partial().extend({
    ...vendorItemRequiredSchema.shape,
})

export type VendorItem = z.infer<typeof vendorItemMutableSchema>
export type Listing = z.infer<typeof listingSchema>
export type UpdateListing = z.infer<typeof updateListingSchema>
