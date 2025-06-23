import { z } from 'zod'

import { vendorSchema } from '@/features/vendor/service/vendor.dto'
import { managerSchema } from '@/features/manager/service/manager.dto'
import { userSchema } from '@/features/user/user.dto'
import { orderTransactionSchema } from '@/features/orderTransaction/orderTransaction.dto'

export const managerWithVendorSchema = managerSchema.extend({
    vendor: vendorSchema,
})

export const managerWithUserSchema = managerSchema.extend({
    user: userSchema,
})

export const managerWithTransactionsSchema = managerSchema.extend({
    transactions: z.array(orderTransactionSchema),
})

export type ManagerWithVendor = z.infer<typeof managerWithVendorSchema>
export type ManagerWithUser = z.infer<typeof managerWithUserSchema>
export type ManagerWithTransactions = z.infer<typeof managerWithTransactionsSchema>
