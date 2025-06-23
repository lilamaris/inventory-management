import { Vendor } from '@/features/composite/vendor.dto'
import prisma from '@/lib/prisma'

export async function getVendors(): Promise<Vendor[]> {
    const vendors = await prisma.vendor.findMany({
        include: {
            items: true,
            categories: true,
            managers: true,
        },
    })
    return vendors
}

export async function getVendor(id: string): Promise<Vendor | null> {
    const vendor = await prisma.vendor.findUnique({
        where: { id },
        include: {
            items: true,
            categories: true,
            managers: true,
        },
    })
    return vendor
}
