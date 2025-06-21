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
