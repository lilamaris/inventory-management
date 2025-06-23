import { OrderItem } from '@/features/orderItem/orderItem.dto'
import prisma from '@/lib/prisma'

export async function getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    const orderItems = await prisma.orderItem.findMany({
        where: {
            orderId,
        },
    })
    return orderItems
}

export async function getOrderItemsByItemId(itemId: string): Promise<OrderItem[]> {
    const orderItems = await prisma.orderItem.findMany({
        where: {
            itemId,
        },
    })
    return orderItems
}

export async function getOrderItem(id: string): Promise<OrderItem | null> {
    const orderItem = await prisma.orderItem.findUnique({
        where: {
            id,
        },
    })
    return orderItem
}

export async function createOrderItem(orderItem: OrderItem): Promise<OrderItem> {
    const newOrderItem = await prisma.orderItem.create({
        data: orderItem,
    })
    return newOrderItem
}

export async function updateOrderItem(id: string, orderItem: OrderItem): Promise<OrderItem> {
    const updatedOrderItem = await prisma.orderItem.update({
        where: { id },
        data: orderItem,
    })
    return updatedOrderItem
}

export async function deleteOrderItem(id: string): Promise<OrderItem> {
    const deletedOrderItem = await prisma.orderItem.delete({
        where: { id },
    })
    return deletedOrderItem
}
