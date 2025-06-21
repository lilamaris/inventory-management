import prisma from '@/lib/prisma'

export async function getVendors() {
    const vendors = await prisma.vendor.findMany({
        include: {
            purchaseOrders: true,
        },
    })

    return vendors
}

export async function getVendorById(id: string) {
    const vendor = await prisma.vendor.findUnique({
        where: { id },
        include: {
            purchaseOrders: true,
            items: true,
            managers: {
                include: {
                    user: true,
                },
            },
        },
    })

    return vendor
}

export async function getVendorWithManagersById(id: string) {
    const vendor = await prisma.vendor.findUnique({
        where: { id },
        include: {
            managers: true,
        },
    })

    return vendor
}

export async function getVendorItems(vendorId: string) {
    const items = await prisma.vendorItem.findMany({
        where: {
            vendorId,
        },
    })

    return items
}

export async function getVendorItemQuantityByManyId(vendorId: string, itemIds: string[]) {
    const items = await prisma.vendorItem.findMany({
        where: {
            id: {
                in: itemIds,
            },
            vendorId,
        },
        select: {
            id: true,
            quantity: true,
        },
    })

    return items.reduce(
        (acc, item) => {
            acc[item.id] = item.quantity
            return acc
        },
        {} as Record<string, number>,
    )
}
