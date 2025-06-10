import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type PaginationOptions = { page: number; limit: number }
export type QueryOption = {
    pagination?: PaginationOptions
    orderBy?: Prisma.CustomerOrderByWithRelationInput
}
export type QueryParams<T extends Prisma.CustomerWhereInput | Prisma.CustomerWhereUniqueInput> = QueryOption & T

const defaultPaginationParams: PaginationOptions = { page: 1, limit: 10 }
const defaultOrderByParams: Prisma.CustomerOrderByWithRelationInput = {
    name: 'asc',
}

type CustomerResult = Prisma.CustomerGetPayload<{
    include: {
        _count: { select: { salesOrders: true } }
    }
}>

export async function findCustomers({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: QueryParams<Prisma.CustomerWhereInput>): Promise<CustomerResult[]> {
    return await prisma.customer.findMany({
        where: params,
        include: {
            _count: { select: { salesOrders: true } },
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
    })
}

export async function findUniqueCustomer({
    ...params
}: QueryParams<Prisma.CustomerWhereUniqueInput>): Promise<CustomerResult | null> {
    return await prisma.customer.findUnique({
        where: params,
        include: {
            _count: { select: { salesOrders: true } },
        },
    })
}

export async function createCustomer(data: Prisma.CustomerCreateInput): Promise<CustomerResult> {
    return await prisma.customer.create({
        data,
        include: {
            _count: { select: { salesOrders: true } },
        },
    })
}

export async function updateCustomer(
    selector: Prisma.CustomerWhereInput,
    data: Prisma.CustomerUpdateInput,
): Promise<{ count: number }> {
    return await prisma.customer.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniqueCustomer(
    selector: Prisma.CustomerWhereUniqueInput,
    data: Prisma.CustomerUpdateInput,
): Promise<CustomerResult> {
    return await prisma.customer.update({
        where: selector,
        data,
        include: {
            _count: { select: { salesOrders: true } },
        },
    })
}

export async function deleteCustomer(selector: Prisma.CustomerWhereInput): Promise<{ count: number }> {
    return await prisma.customer.deleteMany({
        where: selector,
    })
}

export async function deleteUniqueCustomer(selector: Prisma.CustomerWhereUniqueInput): Promise<CustomerResult> {
    return await prisma.customer.delete({
        where: selector,
        include: {
            _count: { select: { salesOrders: true } },
        },
    })
}

export async function existsCustomer(selector: Prisma.CustomerWhereUniqueInput): Promise<boolean> {
    const count = await prisma.customer.count({
        where: selector,
    })
    return count > 0
}
