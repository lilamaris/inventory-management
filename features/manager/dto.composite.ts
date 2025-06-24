import { z } from 'zod'

import { Manager, managerSchema } from '@/features/manager/dto.primitive'
import { PrimitiveWithInclude } from '@/lib/type'

import { vendorSchema } from '@/features/vendor/dto.primitive'
import { userSchema } from '@/features/user/dto.primitive'

export const managerWithVendorSchema = managerSchema.extend({
    vendor: vendorSchema,
})

export const managerWithUserSchema = managerSchema.extend({
    user: userSchema,
})

export type ManagerWithVendor = z.infer<typeof managerWithVendorSchema>
export type ManagerWithUser = z.infer<typeof managerWithUserSchema>

interface IncludeMap {
    vendor: ManagerWithVendor
    user: ManagerWithUser
}

export type ManagerWith<Key extends (keyof IncludeMap)[]> = PrimitiveWithInclude<Manager, IncludeMap, Key>
