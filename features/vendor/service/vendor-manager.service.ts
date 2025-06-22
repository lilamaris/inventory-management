import prisma from '@/lib/prisma'

import { VendorManager, VendorManagerWithTransactions, VendorManagerWithUser } from './vendor-manager.dto'

export async function getManagerByVendorIdAndUserId(vendorId: string, userId: string): Promise<VendorManager | null> {
    const manager = await prisma.vendorManager.findUnique({
        where: { userId_vendorId: { userId, vendorId } },
    })
    return manager
}

export async function getManagersByVendorId(vendorId: string): Promise<VendorManager[] | null> {
    const managers = await prisma.vendorManager.findMany({
        where: { vendorId },
    })
    return managers
}

export async function getManagerTransactionsByVendorIdAndUserId(
    vendorId: string,
    userId: string,
): Promise<VendorManagerWithTransactions | null> {
    const manager = await prisma.vendorManager.findUnique({
        where: { userId_vendorId: { userId, vendorId } },
        include: {
            transactions: true,
        },
    })
    return manager
}

export async function getManagerUserByVendorIdAndUserId(
    vendorId: string,
    userId: string,
): Promise<VendorManagerWithUser | null> {
    const manager = await prisma.vendorManager.findUnique({
        where: { userId_vendorId: { userId, vendorId } },
        include: {
            user: true,
        },
    })
    return manager
}

export async function createVendorManager(vendorId: string, userId: string): Promise<VendorManager> {
    const manager = await prisma.vendorManager.create({
        data: {
            vendorId,
            userId,
        },
    })
    return manager
}

export async function updateOwnerInVendor(vendorId: string, userId: string) {
    const manager = await prisma.vendorManager.update({
        where: { userId_vendorId: { userId, vendorId } },
        data: {
            isOwner: true,
        },
    })
    return manager
}

export async function deleteVendorManager(vendorId: string, userId: string) {
    const manager = await prisma.vendorManager.delete({
        where: { userId_vendorId: { userId, vendorId } },
    })
    return manager
}
