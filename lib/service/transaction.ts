import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type PaginationOptions = { page: number; limit: number }
export type QueryOption = {
    pagination?: PaginationOptions
    orderBy?:
        | Prisma.PurchaseOrderTransactionOrderByWithRelationInput
        | Prisma.SalesOrderTransactionOrderByWithRelationInput
}
export type QueryParams<T extends Prisma.PurchaseOrderTransactionWhereInput | Prisma.SalesOrderTransactionWhereInput> =
    QueryOption & T

const defaultPaginationParams: PaginationOptions = { page: 1, limit: 10 }
const defaultOrderByParams:
    | Prisma.PurchaseOrderTransactionOrderByWithRelationInput
    | Prisma.SalesOrderTransactionOrderByWithRelationInput = {
    createdAt: 'desc',
}

type PurchaseOrderTransactionResult = Prisma.PurchaseOrderTransactionGetPayload<{
    include: {
        user: true
        purchaseOrder: true
    }
}>

type SalesOrderTransactionResult = Prisma.SalesOrderTransactionGetPayload<{
    include: {
        user: true
        salesOrder: true
    }
}>

// Purchase Order Transaction
export async function findPurchaseOrderTransactions({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: QueryParams<Prisma.PurchaseOrderTransactionWhereInput>): Promise<PurchaseOrderTransactionResult[]> {
    return await prisma.purchaseOrderTransaction.findMany({
        where: params,
        include: {
            user: true,
            purchaseOrder: true,
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
    })
}

export async function findUniquePurchaseOrderTransaction({
    ...params
}: QueryParams<Prisma.PurchaseOrderTransactionWhereUniqueInput>): Promise<PurchaseOrderTransactionResult | null> {
    return await prisma.purchaseOrderTransaction.findUnique({
        where: params,
        include: {
            user: true,
            purchaseOrder: true,
        },
    })
}

export async function createPurchaseOrderTransaction(
    data: Prisma.PurchaseOrderTransactionCreateInput,
): Promise<PurchaseOrderTransactionResult> {
    return await prisma.purchaseOrderTransaction.create({
        data,
        include: {
            user: true,
            purchaseOrder: true,
        },
    })
}

export async function updatePurchaseOrderTransaction(
    selector: Prisma.PurchaseOrderTransactionWhereInput,
    data: Prisma.PurchaseOrderTransactionUpdateInput,
): Promise<{ count: number }> {
    return await prisma.purchaseOrderTransaction.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniquePurchaseOrderTransaction(
    selector: Prisma.PurchaseOrderTransactionWhereUniqueInput,
    data: Prisma.PurchaseOrderTransactionUpdateInput,
): Promise<PurchaseOrderTransactionResult> {
    return await prisma.purchaseOrderTransaction.update({
        where: selector,
        data,
        include: {
            user: true,
            purchaseOrder: true,
        },
    })
}

export async function deletePurchaseOrderTransaction(
    selector: Prisma.PurchaseOrderTransactionWhereInput,
): Promise<{ count: number }> {
    return await prisma.purchaseOrderTransaction.deleteMany({
        where: selector,
    })
}

export async function deleteUniquePurchaseOrderTransaction(
    selector: Prisma.PurchaseOrderTransactionWhereUniqueInput,
): Promise<PurchaseOrderTransactionResult> {
    return await prisma.purchaseOrderTransaction.delete({
        where: selector,
        include: {
            user: true,
            purchaseOrder: true,
        },
    })
}

export async function existsPurchaseOrderTransaction(
    selector: Prisma.PurchaseOrderTransactionWhereUniqueInput,
): Promise<boolean> {
    const count = await prisma.purchaseOrderTransaction.count({
        where: selector,
    })
    return count > 0
}

// Sales Order Transaction
export async function findSalesOrderTransactions({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: QueryParams<Prisma.SalesOrderTransactionWhereInput>): Promise<SalesOrderTransactionResult[]> {
    return await prisma.salesOrderTransaction.findMany({
        where: params,
        include: {
            user: true,
            salesOrder: true,
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
    })
}

export async function findUniqueSalesOrderTransaction({
    ...params
}: QueryParams<Prisma.SalesOrderTransactionWhereUniqueInput>): Promise<SalesOrderTransactionResult | null> {
    return await prisma.salesOrderTransaction.findUnique({
        where: params,
        include: {
            user: true,
            salesOrder: true,
        },
    })
}

export async function createSalesOrderTransaction(
    data: Prisma.SalesOrderTransactionCreateInput,
): Promise<SalesOrderTransactionResult> {
    return await prisma.salesOrderTransaction.create({
        data,
        include: {
            user: true,
            salesOrder: true,
        },
    })
}

export async function updateSalesOrderTransaction(
    selector: Prisma.SalesOrderTransactionWhereInput,
    data: Prisma.SalesOrderTransactionUpdateInput,
): Promise<{ count: number }> {
    return await prisma.salesOrderTransaction.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniqueSalesOrderTransaction(
    selector: Prisma.SalesOrderTransactionWhereUniqueInput,
    data: Prisma.SalesOrderTransactionUpdateInput,
): Promise<SalesOrderTransactionResult> {
    return await prisma.salesOrderTransaction.update({
        where: selector,
        data,
        include: {
            user: true,
            salesOrder: true,
        },
    })
}

export async function deleteSalesOrderTransaction(
    selector: Prisma.SalesOrderTransactionWhereInput,
): Promise<{ count: number }> {
    return await prisma.salesOrderTransaction.deleteMany({
        where: selector,
    })
}

export async function deleteUniqueSalesOrderTransaction(
    selector: Prisma.SalesOrderTransactionWhereUniqueInput,
): Promise<SalesOrderTransactionResult> {
    return await prisma.salesOrderTransaction.delete({
        where: selector,
        include: {
            user: true,
            salesOrder: true,
        },
    })
}

export async function existsSalesOrderTransaction(
    selector: Prisma.SalesOrderTransactionWhereUniqueInput,
): Promise<boolean> {
    const count = await prisma.salesOrderTransaction.count({
        where: selector,
    })
    return count > 0
}
