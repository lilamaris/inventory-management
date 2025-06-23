'use client'

import { ColumnDef } from '@tanstack/react-table'
import { formatTime } from '@/lib/utils'
import DataTable from '@/components/data-table'

import { UserOrder } from '@/features/composite/order.dto'
import VendorAvatar from '@/features/vendor/components/vendor-avatar'
import OrderStatus from '@/features/order/components/order-status'

export const columns: ColumnDef<UserOrder>[] = [
    {
        accessorKey: 'vendor',
        header: 'Vender',
        cell: ({ row }) => {
            const { vendor } = row.original
            return <VendorAvatar vendor={vendor} />
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const { status } = row.original
            return <OrderStatus status={status} />
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => {
            const { createdAt } = row.original
            return <div>{formatTime(createdAt)}</div>
        },
    },
    {
        accessorKey: 'orderItems',
        header: 'Items',
        cell: ({ row }) => {
            const { orderItems } = row.original
            return (
                <div>
                    {orderItems[0].quantity}개의 {orderItems[0].item.name} 과 {orderItems.length - 1}개의 다른 상품
                </div>
            )
        },
    },
]

export default function UserOrderTable({ orders }: { orders: UserOrder[] }) {
    return <DataTable columns={columns} data={orders} />
}
