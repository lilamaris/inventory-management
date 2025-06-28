import { OrderStatus } from '@/generated/prisma'
import prisma from '@/lib/prisma'

import { Order } from '@/features/order/dto.primitive'
import { OrderWith } from '@/features/order/dto.composite'

export async function getOrder(id: string): Promise<OrderWith<['orderItems']> | null> {
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            orderItems: {
                include: {
                    item: true,
                },
            },
        },
    })
    return order
}

export async function getOrdersByUserId(userId: string): Promise<OrderWith<['orderItems']>[]> {
    const orders = await prisma.order.findMany({
        where: { orderByUserId: userId },
        include: {
            orderItems: {
                include: {
                    item: true,
                },
            },
        },
    })
    return orders
}

export async function getOrdersByUserIdAndStatus(
    userId: string,
    status: OrderStatus,
): Promise<OrderWith<['orderItems']>[]> {
    const orders = await prisma.order.findMany({
        where: { orderByUserId: userId, status },
        include: {
            orderItems: {
                include: {
                    item: true,
                },
            },
        },
    })
    return orders
}

export async function getOrdersByVendorId(vendorId: string): Promise<OrderWith<['orderItems']>[]> {
    const orders = await prisma.order.findMany({
        where: { vendorId },
        include: {
            orderItems: {
                include: {
                    item: true,
                },
            },
        },
    })
    return orders
}

export async function getOrdersByVendorIdAndStatus(
    vendorId: string,
    status: OrderStatus,
): Promise<OrderWith<['orderItems']>[]> {
    const orders = await prisma.order.findMany({
        where: { vendorId, status },
        include: {
            orderItems: {
                include: {
                    item: true,
                },
            },
        },
    })
    return orders
}

export async function createOrder(vendorId: string, orderByUserId: string): Promise<Order> {
    const order = await prisma.order.create({
        data: { vendorId, orderByUserId, status: OrderStatus.PENDING },
        include: {
            orderItems: true,
        },
    })
    return order
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await prisma.order.update({
        where: { id },
        data: { status },
        include: {
            orderItems: true,
        },
    })
    return order
}

export async function deleteOrder(id: string): Promise<Order> {
    const order = await prisma.order.delete({
        where: { id },
        include: {
            orderItems: true,
        },
    })
    return order
}

export async function getUserOrders(userId: string): Promise<OrderWith<['orderItems' | 'vendor']>[]> {
    const orders = await prisma.order.findMany({
        where: { orderByUserId: userId },
        include: {
            orderItems: {
                include: {
                    item: true,
                },
            },
            vendor: true,
        },
    })
    return orders
}

export async function getVendorOrders(vendorId: string): Promise<OrderWith<['orderItems' | 'orderByUser']>[]> {
    const orders = await prisma.order.findMany({
        where: { vendorId },
        include: {
            orderItems: {
                include: {
                    item: true,
                },
            },
            orderByUser: true,
        },
    })
    return orders
}
