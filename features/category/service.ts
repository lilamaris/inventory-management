import { Category } from '@/features/category/dto.primitive'
import prisma from '@/lib/prisma'

export async function createCategory(category: Category): Promise<Category> {
    const { name, vendorId } = category
    const newCategory = await prisma.category.create({
        data: { name, vendorId },
    })
    return newCategory
}

export async function updateCategory(category: Category): Promise<Category> {
    const { id, name } = category
    const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name },
    })
    return updatedCategory
}

export async function deleteCategory(id: string): Promise<Category> {
    const deletedCategory = await prisma.category.delete({
        where: { id },
    })
    return deletedCategory
}

export async function getCategoriesByVendorId(vendorId: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
        where: { vendorId },
    })

    return categories
}
