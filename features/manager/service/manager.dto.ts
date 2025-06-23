import { z } from 'zod'
import { OrderStatus } from '@/generated/prisma'

import { vendorSchema } from '@/features/vendor/schema'

export const managerSchema = z.object({
    id: z.string(),
    isOwner: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    vendorId: z.string(),
    userId: z.string(),
})

export const venderManagerUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
})

export const vendorManagerTransactionSchema = z.object({
    id: z.string(),
    transactionAt: z.date(),
    previousStatus: z.nativeEnum(OrderStatus),
    status: z.nativeEnum(OrderStatus),
})

export const managerWithUserSchema = managerSchema.extend({
    user: venderManagerUserSchema,
})

export const managerWithTransactionsSchema = managerSchema.extend({
    transactions: z.array(vendorManagerTransactionSchema),
})

export const managerWithVendorSchema = managerWithUserSchema.extend({
    vendor: vendorSchema,
})

export type Manager = z.infer<typeof managerSchema>
export type ManagerWithUser = z.infer<typeof managerWithUserSchema>
export type ManagerWithTransactions = z.infer<typeof managerWithTransactionsSchema>
export type ManagerWithVendor = z.infer<typeof managerWithVendorSchema>
