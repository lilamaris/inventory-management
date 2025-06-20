import prisma from '@/lib/prisma'

import { Listing, UpdateListing, VendorItem } from '@/features/vendor/type'

export class VendorItemError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'VendorItemError'
    }
}

function generateSKU(name: string): string {
    return name.toLowerCase().replace(/ /g, '-')
}

export async function isListing(vendorId: string, sku: string): Promise<boolean> {
    const vendorItem = await prisma.vendorItem.findUnique({
        where: { vendorId_sku: { vendorId, sku } },
    })

    return vendorItem !== null
}

export async function getListing(vendorId: string): Promise<VendorItem[]> {
    const vendorItems = await prisma.vendorItem.findMany({
        where: { vendorId },
        include: { category: true },
    })

    return vendorItems
}

export async function updateListing(params: UpdateListing): Promise<VendorItem> {
    const { vendorId, sku, name, description, quantity, price } = params

    const vendorItem = await prisma.vendorItem.update({
        where: { vendorId_sku: { vendorId, sku } },
        data: {
            name,
            description,
            quantity,
            price,
        },
    })

    return vendorItem
}

export async function listingItem(params: Listing): Promise<VendorItem> {
    const { vendorId, sku: possiblyNullSku, name, description, quantity, price } = params

    const sku = possiblyNullSku ?? generateSKU(name)

    if (await isListing(vendorId, sku)) throw new VendorItemError('Item already listed')

    const vendorItem = await prisma.vendorItem.create({
        data: { vendorId, sku, name, description, quantity, price },
    })

    return vendorItem
}

export async function unlistingItem(vendorId: string, sku: string): Promise<void> {
    await prisma.vendorItem.delete({
        where: { vendorId_sku: { vendorId, sku } },
    })
}
