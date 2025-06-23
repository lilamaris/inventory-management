import { getManagerByVendorIdAndUserId } from '@/features/manager/service/manager.service'
import { ManagerWithVendor, ManagerWithUser, ManagerWithTransactions } from '@/features/composite/manager.dto'
import { getOrderTransactionByManagerId } from '@/features/orderTransaction/orderTransaction.service'
import { getVendor } from '@/features/vendor/service/vendor.service'
import { getUser } from '@/features/user/user.service'

export async function getManagerWithVendor(vendorId: string, userId: string): Promise<ManagerWithVendor | null> {
    const manager = await getManagerByVendorIdAndUserId(vendorId, userId)
    if (!manager) return null

    const vendor = await getVendor(vendorId)
    if (!vendor) return null

    return {
        ...manager,
        vendor,
    }
}

export async function getManagerWithUser(vendorId: string, userId: string): Promise<ManagerWithUser | null> {
    const manager = await getManagerByVendorIdAndUserId(vendorId, userId)
    if (!manager) return null

    const user = await getUser(manager.userId)
    if (!user) return null

    return {
        ...manager,
        user,
    }
}

export async function getManagerWithTransactions(
    vendorId: string,
    userId: string,
): Promise<ManagerWithTransactions | null> {
    const manager = await getManagerByVendorIdAndUserId(vendorId, userId)
    if (!manager) return null

    const transactions = await getOrderTransactionByManagerId(manager.id)
    if (!transactions) return null

    return {
        ...manager,
        transactions,
    }
}
