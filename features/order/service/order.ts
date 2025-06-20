import prisma from '@/lib/prisma'
import { Order } from '@/features/order/type'

export class PurchaseOrderError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'PurchaseOrderError'
    }
}

export type PurchaseOrderParams =
    | {
          userId: string
          vendorId?: never
      }
    | {
          userId?: never
          vendorId: string
      }
export async function getPurchaseOrders(params: PurchaseOrderParams): Promise<Order[]> {
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

export async function createPurchaseOrder({
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
