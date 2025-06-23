import { OrderStatus } from '@/generated/prisma'

import prisma from '@/lib/prisma'
import { OrderItem, UserOrder } from '@/features/composite/order.dto'
import { Order } from '@/features/order/order.dto'

export interface UserOrderParams {
    userId: string
    status: OrderStatus
}

export interface VendorOrderParams {
    vendorId: string
    status: OrderStatus
}

export async function getUserOrders({ userId, status }: UserOrderParams): Promise<UserOrder[]> {
    const orders = await prisma.order.findMany({
        where: { orderByUserId: userId, status },
        include: {
            vendor: true,
            orderItems: {
                include: {
                    item: true,
                },
            },
        },
    })

    return orders
}

export async function createUserOrder(userId: string, vendorId: string, orderItems: OrderItem[]): Promise<Order> {
    const order = await prisma.order.create({
        data: {
            orderByUserId: userId,
            vendorId,
            orderItems: { create: orderItems },
        },
    })
    return order
}