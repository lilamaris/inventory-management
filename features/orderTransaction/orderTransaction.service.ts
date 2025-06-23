import { OrderTransaction } from '@/features/orderTransaction/orderTransaction.dto'
import { OrderStatus } from '@/generated/prisma'
import prisma from '@/lib/prisma'

export async function getOrderTransaction(id: string): Promise<OrderTransaction | null> {
    const orderTransaction = await prisma.orderTransaction.findUnique({
        where: { id },
    })
    return orderTransaction
}

export async function getOrderTransactionsByOrderId(orderId: string): Promise<OrderTransaction[]> {
    const orderTransactions = await prisma.orderTransaction.findMany({
        where: { orderId },
    })
    return orderTransactions
}

export async function getOrderTransactionByManagerId(managerId: string): Promise<OrderTransaction[]> {
    const orderTransactions = await prisma.orderTransaction.findMany({
        where: { updatedManagerId: managerId },
    })
    return orderTransactions
}

export async function getOrderTransactionByOrderStatus(status: OrderStatus): Promise<OrderTransaction[]> {
    const orderTransactions = await prisma.orderTransaction.findMany({
        where: { status },
    })
    return orderTransactions
}

export async function getOrderTransactionByPreviousStatus(previousStatus: OrderStatus): Promise<OrderTransaction[]> {
    const orderTransactions = await prisma.orderTransaction.findMany({
        where: { previousStatus },
    })
    return orderTransactions
}

export async function createOrderTransaction(
    orderId: string,
    previousStatus: OrderStatus,
    status: OrderStatus,
    updatedManagerId: string,
): Promise<OrderTransaction> {
    const orderTransaction = await prisma.orderTransaction.create({
        data: {
            orderId,
            previousStatus,
            status,
            updatedManagerId,
        },
    })
    return orderTransaction
}

export async function updatePreviousStatusInOrderTransaction(
    id: string,
    previousStatus: OrderStatus,
): Promise<OrderTransaction> {
    const orderTransaction = await prisma.orderTransaction.update({
        where: { id },
        data: {
            previousStatus,
        },
    })
    return orderTransaction
}

export async function updateStatusInOrderTransaction(id: string, status: OrderStatus): Promise<OrderTransaction> {
    const orderTransaction = await prisma.orderTransaction.update({
        where: { id },
        data: {
            status,
        },
    })
    return orderTransaction
}

export async function deleteOrderTransaction(id: string): Promise<OrderTransaction> {
    const orderTransaction = await prisma.orderTransaction.delete({
        where: { id },
    })
    return orderTransaction
}
