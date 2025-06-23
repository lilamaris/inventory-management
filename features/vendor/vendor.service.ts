import { Vendor } from '@/features/vendor/vendor.dto'
import prisma from '@/lib/prisma'

export async function createVendor(name: string, description: string): Promise<Vendor> {
    const vendor = await prisma.vendor.create({
        data: { name, description },
    })
    return vendor
}

export async function updateNameInVendor(id: string, name: string): Promise<Vendor> {
    const vendor = await prisma.vendor.update({
        where: { id },
        data: { name },
    })
    return vendor
}

export async function updateDescriptionInVendor(id: string, description: string): Promise<Vendor> {
    const vendor = await prisma.vendor.update({
        where: { id },
        data: { description },
    })
    return vendor
}

export async function deleteVendor(id: string): Promise<Vendor> {
    const vendor = await prisma.vendor.delete({
        where: { id },
    })
    return vendor
}
