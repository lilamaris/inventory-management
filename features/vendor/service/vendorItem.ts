import { Prisma, VendorItem } from '@/generated/prisma'
import prisma from '@/lib/prisma'
import { createItem, deleteItem, isItemExists, updateItem } from '@/lib/server/item'

export class VendorItemError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'VendorItemError'
    }
}

export async function isItemListed(whereclause: Prisma.VendorItemWhereUniqueInput): Promise<boolean> {
    const vendorItem = await prisma.vendorItem.findUnique({
        where: whereclause,
    })

    return vendorItem !== null
}

export async function getVendorItem(whereclause: Prisma.VendorItemWhereInput): Promise<VendorItem[]> {
    const vendorItems = await prisma.vendorItem.findMany({
        where: whereclause,
        include: {
            item: true,
            category: true,
        },
    })

    return vendorItems
}

export async function createVendorItem(
    vendorId: string,
    itemId: string,
    quantity: number,
    price: number,
): Promise<VendorItem> {
    const vendorItem = await prisma.vendorItem.create({
        data: {
            vendorId,
            itemId,
            price,
            quantity,
        },
    })

    return vendorItem
}

export async function updateVendorItem(
    whereclause: Prisma.VendorItemWhereUniqueInput,
    quantity: number,
    price: number,
): Promise<VendorItem> {
    const vendorItem = await prisma.vendorItem.update({
        where: whereclause,
        data: {
            quantity,
            price,
        },
    })

    return vendorItem
}

export type UpdateListingParams = UpdateListing | UpdateListingWithItem
export async function updateListing(params: UpdateListing): Promise<VendorItem>
export async function updateListing(params: UpdateListingWithItem): Promise<VendorItem>
export async function updateListing(params: UpdateListingParams): Promise<VendorItem> {
    const { vendorId, itemId, quantity, price } = params
    if (!(await isItemListed({ vendorId_itemId: { vendorId, itemId } }))) throw new VendorItemError('Item not listed')

    const vendorItem = await updateVendorItem(
        {
            vendorId_itemId: { vendorId, itemId },
        },
        quantity,
        price,
    )

    if (params.mode === 'listingAndItem') {
        const { name, description } = params
        await updateItem({ id: itemId }, name, description)
    }

    return vendorItem
}

export async function deleteVendorItem(whereclause: Prisma.VendorItemWhereUniqueInput): Promise<void> {
    await prisma.vendorItem.delete({
        where: whereclause,
    })
}

export type ListingParams = ListingWithItemCreateInput | ListingWithItemId
export async function listingItem(params: ListingWithItemCreateInput): Promise<VendorItem>
export async function listingItem(params: ListingWithItemId): Promise<VendorItem>
export async function listingItem(params: ListingParams): Promise<VendorItem> {
    const { vendorId, quantity, price } = params

    let itemId: string
    if (params.mode === 'new') {
        const { sku, name, description } = params
        if (await isItemExists({ sku })) throw new VendorItemError('Item already exists')
        const item = await createItem(name, description, sku)
        itemId = item.id
    } else if (params.mode === 'existing') {
        itemId = params.itemId
    } else {
        throw new VendorItemError('Invalid mode')
    }

    if (await isItemListed({ vendorId_itemId: { vendorId, itemId } })) throw new VendorItemError('Item already listed')

    const vendorItem = await createVendorItem(vendorId, itemId, quantity, price)
    return vendorItem
}

export async function unlistingItem(vendorId: string, itemId: string): Promise<void> {
    if (!(await isItemListed({ vendorId_itemId: { vendorId, itemId } }))) throw new VendorItemError('Item not listed')

    const itemVendorCount = await prisma.vendorItem.count({ where: { itemId } })

    if (itemVendorCount === 1) {
        await deleteItem({ id: itemId })
    }

    await deleteVendorItem({ vendorId_itemId: { vendorId, itemId } })
}

export interface VendorItemCommonParams {
    vendorId: string
    quantity: number
    price: number
}

export interface ListingWithItemId extends VendorItemCommonParams {
    mode: 'existing'
    itemId: string
}

export interface ListingWithItemCreateInput extends VendorItemCommonParams {
    mode: 'new'
    sku: string
    name: string
    description: string | null
}

export interface VendorItemUpdateCommonParams extends VendorItemCommonParams {
    itemId: string
}

export interface UpdateListing extends VendorItemUpdateCommonParams {
    mode: 'listingOnly'
}

export interface UpdateListingWithItem extends VendorItemUpdateCommonParams {
    mode: 'listingAndItem'
    name: string
    description: string | null
}
