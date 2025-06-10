import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export interface RtrvItemPaginationOptions {
    page: number
    limit: number
}

export type RtrvItemOptions = {
    pagination?: RtrvItemPaginationOptions
    orderBy?: Prisma.ItemOrderByWithRelationInput
}

export type RtrvParams<T extends Prisma.ItemWhereInput | Prisma.ItemWhereUniqueInput> = RtrvItemOptions & T

export type ItemResult = Prisma.ItemGetPayload<{
    include: {
        category: true
        _count: { select: { purchaseOrderItems: true; salesOrderItems: true } }
    }
}>

const defaultPaginationParams: RtrvItemPaginationOptions = {
    page: 1,
    limit: 10,
}

const defaultOrderByParams: Prisma.ItemOrderByWithRelationInput = {
    createdAt: 'desc',
}

export async function findItems({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: RtrvParams<Prisma.ItemWhereInput>): Promise<ItemResult[]> {
    return await prisma.item.findMany({
        where: params,
        include: {
            category: true,
            _count: { select: { purchaseOrderItems: true, salesOrderItems: true } },
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
    })
}

export async function findItemUnique({
    ...params
}: RtrvParams<Prisma.ItemWhereUniqueInput>): Promise<ItemResult | null> {
    return await prisma.item.findUnique({
        where: params,
        include: {
            category: true,
            _count: { select: { purchaseOrderItems: true, salesOrderItems: true } },
        },
    })
}

export async function createItem(data: Prisma.ItemCreateInput): Promise<ItemResult> {
    return await prisma.item.create({
        data,
        include: {
            category: true,
            _count: { select: { purchaseOrderItems: true, salesOrderItems: true } },
        },
    })
}

export async function updateItem(
    selector: Prisma.ItemWhereInput,
    data: Prisma.ItemUpdateInput,
): Promise<{ count: number }> {
    return await prisma.item.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniqueItem(
    selector: Prisma.ItemWhereUniqueInput,
    data: Prisma.ItemUpdateInput,
): Promise<ItemResult> {
    return await prisma.item.update({
        where: selector,
        data,
        include: {
            category: true,
            _count: { select: { purchaseOrderItems: true, salesOrderItems: true } },
        },
    })
}

export async function deleteItem(selector: Prisma.ItemWhereInput): Promise<{ count: number }> {
    return await prisma.item.deleteMany({
        where: selector,
    })
}

export async function deleteUniqueItem(selector: Prisma.ItemWhereUniqueInput): Promise<ItemResult> {
    return await prisma.item.delete({
        where: selector,
        include: {
            category: true,
            _count: { select: { purchaseOrderItems: true, salesOrderItems: true } },
        },
    })
}
