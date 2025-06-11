import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function getVendors() {
    return await prisma.vendor.findMany()
}

export async function getVendorUnique(selector: Prisma.VendorWhereUniqueInput) {
    return await prisma.vendor.findUnique({
        where: selector,
        include: {
            _count: { select: { purchaseOrders: true } },
        },
    })
}

export async function createVendor(data: Prisma.VendorCreateInput) {
    return await prisma.vendor.create({
        data,
    })
}

export async function updateVendor(selector: Prisma.VendorWhereUniqueInput, data: Prisma.VendorUpdateInput) {
    return await prisma.vendor.update({
        where: selector,
        data,
    })
}

export async function deleteVendor(selector: Prisma.VendorWhereUniqueInput) {
    return await prisma.vendor.delete({
        where: selector,
    })
}
