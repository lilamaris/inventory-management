'use server'

import { prisma } from '@/lib/prisma'
import {
    createVendorSchema,
    updateVendorSchema,
    UpdateVendorState,
    type CreateVendorState,
} from '@/features/vendor/types/vendor'
import { revalidatePath } from 'next/cache'

export const createVendorAction = async (state: CreateVendorState, formData: FormData) => {
    const formDataEntries = Object.fromEntries(formData)

    const validatedFields = createVendorSchema.safeParse(formDataEntries)

    if (!validatedFields.success)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            formData,
            success: false,
            message: 'Invalid form data',
        }

    const { name, description } = validatedFields.data

    try {
        const vendor = await prisma.vendor.create({
            data: { name, description },
        })
        revalidatePath('/')
        return {
            formData,
            success: true,
            message: 'Vendor created successfully',
        }
    } catch (error) {
        console.error('Error creating vendor: ', error)
        return {
            formData,
            success: false,
            message: 'An error occurred while creating the vendor',
        }
    }
}

export const updateVendorAction = async (state: UpdateVendorState, formData: FormData) => {
    const formDataEntries = Object.fromEntries(formData)
    console.log(formDataEntries)

    const validatedFields = updateVendorSchema.safeParse(formDataEntries)

    if (!validatedFields.success)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            formData,
            success: false,
            message: 'Invalid form data',
        }

    const { id, name, description } = validatedFields.data

    try {
        const vendor = await prisma.vendor.update({
            where: { id },
            data: { name, description },
        })
        revalidatePath('/')
        return {
            formData,
            success: true,
            message: 'Vendor updated successfully',
        }
    } catch (error) {
        console.error('Error updating vendor: ', error)
        return {
            formData,
            success: false,
            message: 'An error occurred while updating the vendor',
        }
    }
}
