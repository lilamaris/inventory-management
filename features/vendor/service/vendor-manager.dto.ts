import { z } from 'zod'
import { PurchaseOrderStatus } from '@/generated/prisma'

import { vendorSchema } from '@/features/vendor/schema'

export const venderManagerUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
})

export const vendorManagerTransactionSchema = z.object({
    id: z.string(),
    transactionAt: z.date(),
    previousStatus: z.nativeEnum(PurchaseOrderStatus),
    status: z.nativeEnum(PurchaseOrderStatus),
})

export const vendorManagerSchema = z.object({
    id: z.string(),
    isOwner: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const vendorManagerWithUserSchema = vendorManagerSchema.extend({
    user: venderManagerUserSchema,
})

export const vendorManagerWithTransactionsSchema = vendorManagerSchema.extend({
    transactions: z.array(vendorManagerTransactionSchema),
})

export const vendorWithManagerSchema = vendorManagerWithUserSchema.extend({
    vendor: vendorSchema,
})

export type VendorManager = z.infer<typeof vendorManagerSchema>
export type VendorManagerWithUser = z.infer<typeof vendorManagerWithUserSchema>
export type VendorManagerWithTransactions = z.infer<typeof vendorManagerWithTransactionsSchema>
export type VendorWithManager = z.infer<typeof vendorWithManagerSchema>
