import prisma from '@/lib/prisma'
import { Manager } from '@/features/manager/service/manager.dto'

export async function isManagerExistsInVendor(vendorId: string, userId: string): Promise<boolean> {
    const manager = await prisma.manager.findUnique({
        where: { vendorId_userId: { vendorId, userId } },
    })
    return manager !== null
}

export async function isManagerOwnerInVendor(vendorId: string, userId: string): Promise<boolean> {
    const manager = await prisma.manager.findUnique({
        where: { vendorId_userId: { vendorId, userId } },
        select: {
            isOwner: true,
        },
    })
    return manager?.isOwner ?? false
}

export async function getManagerByVendorIdAndUserId(vendorId: string, userId: string): Promise<Manager | null> {
    const manager = await prisma.manager.findUnique({
        where: { vendorId_userId: { vendorId, userId } },
    })
    return manager
}

export async function getManagersByVendorId(vendorId: string): Promise<Manager[] | null> {
    const managers = await prisma.manager.findMany({
        where: { vendorId },
    })
    return managers
}

export async function createManager(vendorId: string, userId: string): Promise<Manager> {
    const manager = await prisma.manager.create({
        data: {
            vendorId,
            userId,
        },
    })
    return manager
}

export async function updateOwnerInVendor(vendorId: string, userId: string): Promise<Manager> {
    const manager = await prisma.manager.update({
        where: { vendorId_userId: { vendorId, userId } },
        data: {
            isOwner: true,
        },
    })
    return manager
}

export async function deleteManager(vendorId: string, userId: string): Promise<Manager> {
    const manager = await prisma.manager.delete({
        where: { vendorId_userId: { vendorId, userId } },
    })
    return manager
}
