import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type PaginationOptions = { page: number; limit: number }
export type QueryOption = {
    pagination?: PaginationOptions
    orderBy?: Prisma.CategoryOrderByWithRelationInput
}
export type QueryParams<T extends Prisma.CategoryWhereInput | Prisma.CategoryWhereUniqueInput> = QueryOption & T

const defaultPaginationParams: PaginationOptions = { page: 1, limit: 10 }
const defaultOrderByParams: Prisma.CategoryOrderByWithRelationInput = { name: 'asc' }

type CategoryResult = Prisma.CategoryGetPayload<{
    include: {
        _count: { select: { items: true } }
    }
}>

export async function findCategories({
    pagination = defaultPaginationParams,
    orderBy = defaultOrderByParams,
    ...params
}: QueryParams<Prisma.CategoryWhereInput>): Promise<CategoryResult[]> {
    return await prisma.category.findMany({
        where: params,
        include: {
            _count: { select: { items: true } },
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        orderBy,
    })
}

export async function findUniqueCategory({
    ...params
}: QueryParams<Prisma.CategoryWhereUniqueInput>): Promise<CategoryResult | null> {
    return await prisma.category.findUnique({
        where: params,
        include: {
            _count: { select: { items: true } },
        },
    })
}

export async function createCategory(data: Prisma.CategoryCreateInput): Promise<CategoryResult> {
    return await prisma.category.create({
        data,
        include: {
            _count: { select: { items: true } },
        },
    })
}

export async function updateCategory(
    selector: Prisma.CategoryWhereInput,
    data: Prisma.CategoryUpdateInput,
): Promise<{ count: number }> {
    return await prisma.category.updateMany({
        where: selector,
        data,
    })
}

export async function updateUniqueCategory(
    selector: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput,
): Promise<CategoryResult> {
    return await prisma.category.update({
        where: selector,
        data,
        include: {
            _count: { select: { items: true } },
        },
    })
}

export async function deleteCategory(selector: Prisma.CategoryWhereInput): Promise<{ count: number }> {
    return await prisma.category.deleteMany({
        where: selector,
    })
}

export async function deleteUniqueCategory(selector: Prisma.CategoryWhereUniqueInput): Promise<CategoryResult> {
    return await prisma.category.delete({
        where: selector,
        include: {
            _count: { select: { items: true } },
        },
    })
}

export async function existsCategory(selector: Prisma.CategoryWhereUniqueInput): Promise<boolean> {
    const count = await prisma.category.count({
        where: selector,
    })
    return count > 0
}
