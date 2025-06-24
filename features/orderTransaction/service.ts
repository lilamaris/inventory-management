import { OrderTransaction } from '@/features/orderTransaction/dto.primitive'
import { OrderStatus, Prisma } from '@/generated/prisma'
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
        where: { updatedByUserId: managerId },
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

export async function createOrderTransactionByOrderId(
    orderId: string,
    previousStatus: OrderStatus,
    status: OrderStatus,
    updatedByUserId: string,
): Promise<OrderTransaction> {
    const orderTransaction = await prisma.orderTransaction.create({
        data: {
            orderId,
            previousStatus,
            status,
            updatedByUserId,
        },
    })
    return orderTransaction
}

export const $createOrderTransaction =
    (tx: Prisma.TransactionClient) =>
    (orderId: string, previousStatus: OrderStatus, status: OrderStatus, updatedByUserId: string) =>
        tx.orderTransaction.create({
            data: {
                orderId,
                previousStatus,
                status,
                updatedByUserId,
            },
        })

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
