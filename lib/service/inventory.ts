import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export interface GetInventoryItemsParams {
    page?: number
    limit?: number
    search?: string
    categoryId?: string
    createdById?: string
    orderBy?: Prisma.InventoryItemOrderByWithRelationInput
}
export const getInventoryItems = async (
    params?: GetInventoryItemsParams,
): Promise<
    Prisma.InventoryItemGetPayload<{
        include: {
            category: { select: { id: true; name: true; description: true } }
            createdBy: { select: { id: true; name: true; email: true; image: true } }
        }
    }>[]
> => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const { page = 1, limit = 10, search = '', categoryId, createdById, orderBy } = params || {}

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
        ...(createdById ? { createdById } : {}),
    }

    const items = await prisma.inventoryItem.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
        include: {
            category: { select: { id: true, name: true, description: true } },
            createdBy: { select: { id: true, name: true, email: true, image: true } },
        },
    })

    return items
}
