import { Order } from '@/features/order/order.dto'
import { OrderStatus } from '@/generated/prisma'
import prisma from '@/lib/prisma'

export async function getOrder(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
        where: { id },
    })
    return order
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        where: { orderByUserId: userId },
    })
    return orders
}

export async function getOrdersByUserIdAndStatus(userId: string, status: OrderStatus): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        where: { orderByUserId: userId, status },
    })
    return orders
}

export async function getOrdersByVendorId(vendorId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        where: { vendorId },
    })
    return orders
}

export async function getOrdersByVendorIdAndStatus(vendorId: string, status: OrderStatus): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        where: { vendorId, status },
    })
    return orders
}

export async function createOrder(vendorId: string, orderByUserId: string): Promise<Order> {
    const order = await prisma.order.create({
        data: { vendorId, orderByUserId, status: OrderStatus.PENDING },
    })
    return order
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await prisma.order.update({
        where: { id },
        data: { status },
    })
    return order
}

export async function deleteOrder(id: string): Promise<Order> {
    const order = await prisma.order.delete({
        where: { id },
    })
    return order
}
