import { prisma } from '@/lib/prisma'
import type { InventoryItem, Prisma } from '@prisma/client'

export interface GetInventoryItemsParams {
    page?: number
    limit?: number
    search?: string
    categoryId?: string
    orderBy?: Prisma.InventoryItemOrderByWithRelationInput
}
export const getInventoryItems = async (params?: GetInventoryItemsParams): Promise<InventoryItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { page = 1, limit = 10, search = '', categoryId, orderBy } = params || {}

    const searchQuery = search
        ? {
              OR: [
                  { name: { contains: search, mode: 'insensitive' as const } },
                  { description: { contains: search, mode: 'insensitive' as const } },
              ],
          }
        : {}

    const where: Prisma.InventoryItemWhereInput = {
        ...searchQuery,
        ...(categoryId ? { category: { id: categoryId } } : {}),
    }

    const items = await prisma.inventoryItem.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy })

    return items
}
