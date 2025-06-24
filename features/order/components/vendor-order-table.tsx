'use client'

import * as React from 'react'
import { MoreHorizontal } from 'lucide-react'

import { OrderStatus as PrismaOrderStatus } from '@/generated/prisma'
import { formatTime } from '@/lib/utils'

import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'

import DataTable from '@/components/data-table'
import DataTableColumnHeader from '@/components/data-table-column.header'
import DataTableViewOptions from '@/components/data-table-view-options'
import DataTablePagination from '@/components/data-table-pagination'

import { OrderWith } from '@/features/order/dto.composite'
import { getOrderStatus } from '@/features/order/utils'

import UserAvatar from '@/features/user/components/user-avatar'
import OrderStatus from '@/features/order/components/order-status'
import OrderEditSheet from '@/features/order/components/order-edit-sheet'
import OrderFormField from '@/features/order/components/order-form-field'

export const columns: ColumnDef<OrderWith<['orderItems' | 'orderByUser']>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'orderByUser',
        header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
        cell: ({ row }) => {
            const { orderByUser } = row.original
            return <UserAvatar user={orderByUser} />
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const { status } = row.original
            return <OrderStatus status={status} />
        },
    },
    {
        id: 'total',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
        cell: ({ row }) => {
            const { orderItems } = row.original
            return (
                <div>
                    {orderItems
                        .reduce((acc, orderItem) => acc + orderItem.quantity * orderItem.item.price, 0)
                        .toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                </div>
            )
        },
    },
    {
        id: 'items',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
        cell: ({ row }) => {
            const { orderItems } = row.original
            return <div>{orderItems.reduce((acc, item) => acc + item.quantity, 0)} Items</div>
        },
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        cell: ({ row }) => {
            const { createdAt } = row.original
            return <div>{formatTime(createdAt)}</div>
        },
    },
    {
        id: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
        cell: ({ row }) => (
            <div className="flex">
                <OrderEditSheet triggerIcon={<MoreHorizontal />}>
                    <OrderFormField defaultValue={row.original} />
                </OrderEditSheet>
            </div>
        ),
    },
]

export default function VendorOrderTable({ orders }: { orders: OrderWith<['orderItems' | 'orderByUser']>[] }) {
    const [status, setStatus] = React.useState<PrismaOrderStatus>(PrismaOrderStatus.PENDING)
    const filteredOrders = React.useMemo(() => orders.filter((ord) => ord.status === status), [orders, status])
    const table = useReactTable<OrderWith<['orderItems' | 'orderByUser']>>({
        data: filteredOrders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Tabs
            defaultValue={PrismaOrderStatus.PENDING}
            onValueChange={(value) => setStatus(getOrderStatus(value) ?? PrismaOrderStatus.PENDING)}
        >
            <div className="flex items-center justify-between">
                <TabsList>
                    <TabsTrigger value={PrismaOrderStatus.PENDING}>Pending</TabsTrigger>
                    <TabsTrigger value={PrismaOrderStatus.APPROVED}>Approved</TabsTrigger>
                    <TabsTrigger value={PrismaOrderStatus.REJECTED}>Rejected</TabsTrigger>
                    <TabsTrigger value={PrismaOrderStatus.DELIVERED}>Delivered</TabsTrigger>
                </TabsList>
                <DataTableViewOptions table={table} />
            </div>
            <div className="flex flex-col gap-2">
                <DataTable table={table} />
                <DataTablePagination table={table} />
            </div>
        </Tabs>
    )
}
