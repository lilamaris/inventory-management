import z from 'zod'
import type { ActionState } from '@/lib/types'

export type CreateVendorState = ActionState<typeof createVendorSchema>
export type UpdateVendorState = ActionState<typeof updateVendorSchema>

export const createVendorSchema = z.object({
    name: z.string().min(1, { message: 'Vendor name must be at least 1 character' }),
    description: z.string().optional(),
})

export const updateVendorSchema = createVendorSchema.extend({
    id: z.string(),
})
