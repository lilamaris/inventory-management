import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type PaginationOptions = { page: number; limit: number }
export type QueryOption = {
    pagination?: PaginationOptions
    orderBy?: Prisma.PurchaseOrderOrderByWithRelationInput
}
export type QueryParams<T extends Prisma.PurchaseOrderWhereInput | Prisma.PurchaseOrderWhereUniqueInput> = QueryOption &
    T

const defaultPaginationParams: PaginationOptions = { page: 1, limit: 10 }
const defaultOrderByParams: Prisma.PurchaseOrderOrderByWithRelationInput = {
    orderedAt: 'desc',
}

type PurchaseOrderResult = Prisma.PurchaseOrderGetPayload<{
    include: {
        vendor: true
        items: {
            include: {
                item: true
            }
        }
        purchaseOrderTransactions: {
            include: {
                user: true
            }
        }
    }
}>

export async function findPurchaseOrders({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: QueryParams<Prisma.PurchaseOrderWhereInput>): Promise<PurchaseOrderResult[]> {
    return await prisma.purchaseOrder.findMany({
        where: params,
        include: {
            vendor: true,
            items: {
                include: {
                    item: true,
                },
            },
            purchaseOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
    })
}

export async function findUniquePurchaseOrder({
    ...params
}: QueryParams<Prisma.PurchaseOrderWhereUniqueInput>): Promise<PurchaseOrderResult | null> {
    return await prisma.purchaseOrder.findUnique({
        where: params,
        include: {
            vendor: true,
            items: {
                include: {
                    item: true,
                },
            },
            purchaseOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function createPurchaseOrder(data: Prisma.PurchaseOrderCreateInput): Promise<PurchaseOrderResult> {
    return await prisma.purchaseOrder.create({
        data,
        include: {
            vendor: true,
            items: {
                include: {
                    item: true,
                },
            },
            purchaseOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function updatePurchaseOrder(
    selector: Prisma.PurchaseOrderWhereInput,
    data: Prisma.PurchaseOrderUpdateInput,
): Promise<{ count: number }> {
    return await prisma.purchaseOrder.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniquePurchaseOrder(
    selector: Prisma.PurchaseOrderWhereUniqueInput,
    data: Prisma.PurchaseOrderUpdateInput,
): Promise<PurchaseOrderResult> {
    return await prisma.purchaseOrder.update({
        where: selector,
        data,
        include: {
            vendor: true,
            items: {
                include: {
                    item: true,
                },
            },
            purchaseOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function deletePurchaseOrder(selector: Prisma.PurchaseOrderWhereInput): Promise<{ count: number }> {
    return await prisma.purchaseOrder.deleteMany({
        where: selector,
    })
}

export async function deleteUniquePurchaseOrder(
    selector: Prisma.PurchaseOrderWhereUniqueInput,
): Promise<PurchaseOrderResult> {
    return await prisma.purchaseOrder.delete({
        where: selector,
        include: {
            vendor: true,
            items: {
                include: {
                    item: true,
                },
            },
            purchaseOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function existsPurchaseOrder(selector: Prisma.PurchaseOrderWhereUniqueInput): Promise<boolean> {
    const count = await prisma.purchaseOrder.count({
        where: selector,
    })
    return count > 0
}
