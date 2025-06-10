import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type PaginationOptions = { page: number; limit: number }
export type QueryOption = {
    pagination?: PaginationOptions
    orderBy?: Prisma.SalesOrderOrderByWithRelationInput
}
export type QueryParams<T extends Prisma.SalesOrderWhereInput | Prisma.SalesOrderWhereUniqueInput> = QueryOption & T

const defaultPaginationParams: PaginationOptions = { page: 1, limit: 10 }
const defaultOrderByParams: Prisma.SalesOrderOrderByWithRelationInput = {
    orderedAt: 'desc',
}

type SalesOrderResult = Prisma.SalesOrderGetPayload<{
    include: {
        customer: true
        items: {
            include: {
                item: true
            }
        }
        salesOrderTransactions: {
            include: {
                user: true
            }
        }
    }
}>

export async function findSalesOrders({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: QueryParams<Prisma.SalesOrderWhereInput>): Promise<SalesOrderResult[]> {
    return await prisma.salesOrder.findMany({
        where: params,
        include: {
            customer: true,
            items: {
                include: {
                    item: true,
                },
            },
            salesOrderTransactions: {
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

export async function findUniqueSalesOrder({
    ...params
}: QueryParams<Prisma.SalesOrderWhereUniqueInput>): Promise<SalesOrderResult | null> {
    return await prisma.salesOrder.findUnique({
        where: params,
        include: {
            customer: true,
            items: {
                include: {
                    item: true,
                },
            },
            salesOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function createSalesOrder(data: Prisma.SalesOrderCreateInput): Promise<SalesOrderResult> {
    return await prisma.salesOrder.create({
        data,
        include: {
            customer: true,
            items: {
                include: {
                    item: true,
                },
            },
            salesOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function updateSalesOrder(
    selector: Prisma.SalesOrderWhereInput,
    data: Prisma.SalesOrderUpdateInput,
): Promise<{ count: number }> {
    return await prisma.salesOrder.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniqueSalesOrder(
    selector: Prisma.SalesOrderWhereUniqueInput,
    data: Prisma.SalesOrderUpdateInput,
): Promise<SalesOrderResult> {
    return await prisma.salesOrder.update({
        where: selector,
        data,
        include: {
            customer: true,
            items: {
                include: {
                    item: true,
                },
            },
            salesOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function deleteSalesOrder(selector: Prisma.SalesOrderWhereInput): Promise<{ count: number }> {
    return await prisma.salesOrder.deleteMany({
        where: selector,
    })
}

export async function deleteUniqueSalesOrder(selector: Prisma.SalesOrderWhereUniqueInput): Promise<SalesOrderResult> {
    return await prisma.salesOrder.delete({
        where: selector,
        include: {
            customer: true,
            items: {
                include: {
                    item: true,
                },
            },
            salesOrderTransactions: {
                include: {
                    user: true,
                },
            },
        },
    })
}

export async function existsSalesOrder(selector: Prisma.SalesOrderWhereUniqueInput): Promise<boolean> {
    const count = await prisma.salesOrder.count({
        where: selector,
    })
    return count > 0
}
