import prisma from '@/lib/prisma'
import { Order } from '@/features/order/type'

export class OrderError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'OrderError'
    }
}

export type OrderParams =
    | {
          userId: string
          vendorId?: never
      }
    | {
          userId?: never
          vendorId: string
      }
export async function getOrders(params: OrderParams): Promise<Order[]> {
    const { userId, vendorId } = params
    const orders = await prisma.purchaseOrder.findMany({
        where: {
            ...(userId && { orderByUserId: userId }),
            ...(vendorId && { vendorId }),
        },
        include: {
            items: {
                include: {
                    vendorItem: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        },
                    },
                },
            },
            vendor: {
                select: {
                    id: true,
                    name: true,
                },
            },
            orderByUser: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    })

    return orders
}

export async function getOrderById(id: string): Promise<Order | null> {
    const order = await prisma.purchaseOrder.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    vendorItem: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        },
                    },
                },
            },
            vendor: {
                select: {
                    id: true,
                    name: true,
                },
            },
            orderByUser: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    })

    return order
}

export async function createOrder({
    userId,
    vendorId,
    items,
}: {
    userId: string
    vendorId: string
    items: { vendorItemId: string; quantity: number }[]
}) {
    const purchaseOrder = await prisma.purchaseOrder.create({
        data: {
            vendorId,
            orderByUserId: userId,
            items: {
                create: items.map((item) => ({
                    vendorItemId: item.vendorItemId,
                    quantity: item.quantity,
                })),
            },
        },
    })

    return purchaseOrder
}
