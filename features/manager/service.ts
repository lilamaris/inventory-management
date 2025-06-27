import prisma from '@/lib/prisma'

import { Manager } from '@/features/manager/dto.primitive'
import { type ManagerWith } from '@/features/manager/dto.composite'

export async function isManagerOwnerInVendor(vendorId: string, userId: string): Promise<boolean> {
    const manager = await prisma.manager.findUnique({
        where: { vendorId_userId: { vendorId, userId } },
        select: {
            isOwner: true,
        },
    })
    return manager?.isOwner ?? false
}

export async function isManagerInVendor(userId: string, vendorId: string): Promise<boolean> {
    const manager = await prisma.manager.findUnique({
        where: { vendorId_userId: { vendorId, userId } },
    })
    return manager !== null
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

export async function getOwnVendorByUserId(userId: string): Promise<ManagerWith<['vendor']>['vendor'] | null> {
    const manager = await prisma.manager.findUnique({
        where: { userId, isOwner: true },
        include: {
            vendor: true,
        },
    })
    return manager?.vendor ?? null
}

export async function getManagersByVendorId(vendorId: string): Promise<ManagerWith<['user']>[]> {
    const managers = await prisma.manager.findMany({
        where: { vendorId },
        include: {
            user: true,
        },
    })
    return managers
}

export async function getManagerByUserId(userId: string): Promise<ManagerWith<['vendor']> | null> {
    const manager = await prisma.manager.findUnique({
        where: { userId },
        include: {
            vendor: true,
        },
    })
    return manager ?? null
}
