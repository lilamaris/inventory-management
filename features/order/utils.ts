import { OrderStatus } from '@prisma/client'

export const orderStatusToLabel: Record<OrderStatus, string> = {
    [OrderStatus.IN_CART]: 'In Cart',
    [OrderStatus.PENDING]: 'Pending',
    [OrderStatus.REJECTED]: 'Rejected',
    [OrderStatus.CANCELLED]: 'Cancelled',
    [OrderStatus.APPROVED]: 'Approved',
    [OrderStatus.DELIVERED]: 'Delivered',
}

export const labelToOrderStatus: Record<string, OrderStatus> = {
    pending: OrderStatus.PENDING,
    approved: OrderStatus.APPROVED,
    rejected: OrderStatus.REJECTED,
    cancelled: OrderStatus.CANCELLED,
    delivered: OrderStatus.DELIVERED,
}

export function getOrderStatus(status: string): OrderStatus | null {
    const lowerCaseStatus = status.toLowerCase()
    if (!(lowerCaseStatus in labelToOrderStatus)) {
        return null
    }
    return labelToOrderStatus[lowerCaseStatus]
}
