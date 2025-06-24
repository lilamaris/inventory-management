'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/lib/server/session'

import { UpdateOrderStatus, updateOrderStatusSchema } from '@/features/order/dto.composite'
import { isManagerInVendor } from '@/features/manager/service'
import { $createOrderTransaction } from '../orderTransaction/service'

export default async function updateOrderStatus(state: UpdateOrderStatus, formData: FormData) {
    const { session, user } = await getCurrentSession()
    if (!session || !user) redirect('/login')

    const formEntries = Object.fromEntries(formData)

    const validatedFields = updateOrderStatusSchema.safeParse(formEntries)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { orderId, vendorId, status } = validatedFields.data

    // before update, check user who update order is in vendor. if not, redirect to console
    if (!isManagerInVendor(user.id, vendorId)) redirect('/console')

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        })
        if (!order) throw new Error('Order not found')
        if (order.vendorId !== vendorId) throw new Error('Order not found')
        if (order.status === status) throw new Error('Can not update to same status')

        await prisma.$transaction(async (tx) => {
            if (!order) throw new Error('Order not found')
            if (order.vendorId !== vendorId) throw new Error('Order not found')
            await tx.order.update({
                where: { id: orderId },
                data: { status },
            })
            await $createOrderTransaction(tx)(orderId, order.status, status, user.id)
        })
    } catch (error) {
        return {
            message: error instanceof Error ? error.message : 'Order updated failed.',
        }
    }
    revalidatePath('/')
    return {
        message: 'Order status updated successfully',
    }
}
