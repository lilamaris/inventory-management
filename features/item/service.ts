import { Item } from '@/features/item/dto.primitive'
import prisma from '@/lib/prisma'
import { ItemWith } from '@/features/item/dto.composite'

export async function getItem(id: string): Promise<Item | null> {
    const item = await prisma.item.findUnique({
        where: { id },
    })
    return item
}

export async function getItemsByVendorId(vendorId: string): Promise<ItemWith<['category' | 'orderItems']>[]> {
    const items = await prisma.item.findMany({
        where: { vendorId },
        include: {
            category: true,
            orderItems: {
                include: {
                    item: true,
                },
            },
        },
    })
    return items
}

export async function createItem(itemData: Item): Promise<Item> {
    const item = await prisma.item.create({
        data: itemData,
    })
    return item
}

export async function updateItem(id: string, itemData: Item): Promise<Item> {
    const item = await prisma.item.update({
        where: { id },
        data: itemData,
    })
    return item
}

export async function deleteItem(id: string): Promise<Item> {
    const item = await prisma.item.delete({
        where: { id },
    })
    return item
}
