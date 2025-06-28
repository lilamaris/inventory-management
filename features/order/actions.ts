'use server'

import { OrderStatus } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/lib/server/session'

import { UpdateOrderStatus, updateOrderStatusSchema } from '@/features/order/dto.composite'
import { isManagerInVendor } from '@/features/manager/service'
import { $createOrderTransaction } from '@/features/orderTransaction/service'
import { getOrder } from '@/features/order/service'

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

    if (!isManagerInVendor(user.id, vendorId)) redirect('/console')

    const order = await getOrder(orderId)
    if (!order) throw new Error('Order not found')
    if (order.vendorId !== vendorId) throw new Error('Order not found')
    if (order.status === status) throw new Error('Can not update to same status')

    try {
        await prisma.$transaction(async (tx) => {
            if (!order) throw new Error('Order not found')
            if (order.vendorId !== vendorId) throw new Error('Order not found')
            await tx.order.update({
                where: { id: orderId },
                data: { status },
            })

            // if status is delivered, we need to update vendor item quantity depending by order items quantity
            if (status === OrderStatus.DELIVERED) {
                const { orderItems } = order
                await tx.item.updateMany({
                    where: { id: { in: orderItems.map((item) => item.itemId) } },
                    data: { quantity: { decrement: orderItems.reduce((acc, item) => acc + item.quantity, 0) } },
                })
            }

            if (order.status === OrderStatus.DELIVERED && status !== OrderStatus.DELIVERED) {
                const { orderItems } = order
                await tx.item.updateMany({
                    where: { id: { in: orderItems.map((item) => item.itemId) } },
                    data: { quantity: { increment: orderItems.reduce((acc, item) => acc + item.quantity, 0) } },
                })
            }

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
