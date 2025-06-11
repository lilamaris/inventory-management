'use server'

import { prisma } from '@/lib/prisma'
import { createVendorSchema, type CreateVendorState } from '@/features/vendor/types/vendor'
import { revalidatePath } from 'next/cache'

export const createVendorAction = async (state: CreateVendorState, formData: FormData) => {
    const formDataEntries = Object.fromEntries(formData)

    const validatedFields = createVendorSchema.safeParse(formDataEntries)

    if (!validatedFields.success)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            formData,
        }

    const { name, description } = validatedFields.data

    try {
        const vendor = await prisma.vendor.create({
            data: { name, description },
        })
        revalidatePath('/')
    } catch (error) {
        console.error('Error creating vendor: ', error)
    }
}
