import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type PaginationOptions = { page: number; limit: number }
export type QueryOption = {
    pagination?: PaginationOptions
    orderBy?: Prisma.VendorOrderByWithRelationInput
}
export type QueryParams<T extends Prisma.VendorWhereInput | Prisma.VendorWhereUniqueInput> = QueryOption & T

const defaultPaginationParams: PaginationOptions = { page: 1, limit: 10 }
const defaultOrderByParams: Prisma.VendorOrderByWithRelationInput = {
    name: 'asc',
}

type VendorResult = Prisma.VendorGetPayload<{
    include: {
        _count: { select: { purchaseOrders: true } }
    }
}>

export async function findVendors({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: QueryParams<Prisma.VendorWhereInput>): Promise<VendorResult[]> {
    return await prisma.vendor.findMany({
        where: params,
        include: {
            _count: { select: { purchaseOrders: true } },
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
    })
}

export async function findUniqueVendor({
    ...params
}: QueryParams<Prisma.VendorWhereUniqueInput>): Promise<VendorResult | null> {
    return await prisma.vendor.findUnique({
        where: params,
        include: {
            _count: { select: { purchaseOrders: true } },
        },
    })
}

export async function createVendor(data: Prisma.VendorCreateInput): Promise<VendorResult> {
    return await prisma.vendor.create({
        data,
        include: {
            _count: { select: { purchaseOrders: true } },
        },
    })
}

export async function updateVendor(
    selector: Prisma.VendorWhereInput,
    data: Prisma.VendorUpdateInput,
): Promise<{ count: number }> {
    return await prisma.vendor.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniqueVendor(
    selector: Prisma.VendorWhereUniqueInput,
    data: Prisma.VendorUpdateInput,
): Promise<VendorResult> {
    return await prisma.vendor.update({
        where: selector,
        data,
        include: {
            _count: { select: { purchaseOrders: true } },
        },
    })
}

export async function deleteVendor(selector: Prisma.VendorWhereInput): Promise<{ count: number }> {
    return await prisma.vendor.deleteMany({
        where: selector,
    })
}

export async function deleteUniqueVendor(selector: Prisma.VendorWhereUniqueInput): Promise<VendorResult> {
    return await prisma.vendor.delete({
        where: selector,
        include: {
            _count: { select: { purchaseOrders: true } },
        },
    })
}

export async function existsVendor(selector: Prisma.VendorWhereUniqueInput): Promise<boolean> {
    const count = await prisma.vendor.count({
        where: selector,
    })
    return count > 0
}
