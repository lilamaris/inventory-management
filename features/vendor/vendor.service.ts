import { Vendor } from '@/features/vendor/vendor.dto'
import prisma from '@/lib/prisma'

export async function getVendors(): Promise<Vendor[]> {
    const vendors = await prisma.vendor.findMany()
    return vendors
}

export async function getVendor(id: string): Promise<Vendor | null> {
    const vendor = await prisma.vendor.findUnique({
        where: { id },
    })
    return vendor
}

export async function getVendorByName(name: string): Promise<Vendor[] | null> {
    const vendor = await prisma.vendor.findMany({
        where: { name },
    })
    return vendor
}

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
