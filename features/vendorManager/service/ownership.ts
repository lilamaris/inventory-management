import prisma from '@/lib/prisma'

export const getOwnVendor = async (userId: string) => {
    const vendorManager = await prisma.vendorManager.findMany({
        where: {
            userId,
            isOwner: true,
        },
        select: {
            vendor: true,
        },
    })

    return vendorManager.map((manager) => manager.vendor)
}

export const isVendorOwner = async (userId: string, vendorId: string) => {
    const vendorManager = await prisma.vendorManager.findUnique({
        where: {
            userId_vendorId: {
                userId,
                vendorId,
            },
        },
    })

    return vendorManager?.isOwner ?? false
}
