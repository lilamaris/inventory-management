import { Item, Prisma } from '@/generated/prisma'
import prisma from '@/lib/prisma'

export async function getItem(params: Prisma.ItemWhereUniqueInput): Promise<Item | null> {
    const item = await prisma.item.findUnique({
        where: params,
    })
    return item
}

export async function isItemExists(params: Prisma.ItemWhereUniqueInput): Promise<boolean> {
    const item = await prisma.item.count({
        where: params,
    })
    return item > 0
}

export async function createItem(name: string, description: string | null, sku: string): Promise<Item> {
    const item = await prisma.item.create({
        data: {
            sku,
            name,
            description,
        },
    })
    return item
}

export async function updateItem(
    whereclause: Prisma.ItemWhereUniqueInput,
    name: string,
    description: string | null,
): Promise<Item> {
    const item = await prisma.item.update({
        where: whereclause,
        data: { name, description },
    })
    return item
}

export async function deleteItem(whereclause: Prisma.ItemWhereUniqueInput): Promise<void> {
    await prisma.item.delete({ where: whereclause })
}
