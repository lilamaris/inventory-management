'use client'

import * as React from 'react'
import { ArrowRight } from 'lucide-react'

import { OrderStatus as PrismaOrderStatus } from '@/generated/prisma'
import { formatTime } from '@/lib/utils'

import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

import DataTable from '@/components/data-table'
import DataTableColumnHeader from '@/components/data-table-column.header'
import DataTableViewOptions from '@/components/data-table-view-options'
import DataTablePagination from '@/components/data-table-pagination'

import { OrderTransactionWith } from '@/features/orderTransaction/dto.composite'

import UserAvatar from '@/features/user/components/user-avatar'
import OrderStatus from '@/features/order/components/order-status'

export const columns: ColumnDef<OrderTransactionWith<['order' | 'updatedByUser']>>[] = [
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
        accessorKey: 'order',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
        cell: ({ row }) => {
            const { order } = row.original
            return (
                <div className="flex flex-col">
                    <div className="font-medium">Order #{order.id.slice(0, 8)}</div>
                    <div className="text-sm text-muted-foreground">{order.id}</div>
                </div>
            )
        },
    },
    {
        accessorKey: 'updatedByUser',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Updated By" />,
        cell: ({ row }) => {
            const { updatedByUser } = row.original
            return <UserAvatar user={updatedByUser} />
        },
    },
    {
        accessorKey: 'previousStatus',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Previous Status" />,
        cell: ({ row }) => {
            const { previousStatus } = row.original
            return <OrderStatus status={previousStatus} />
        },
    },
    {
        id: 'statusChange',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Change" />,
        cell: ({ row }) => {
            const { previousStatus, status } = row.original
            return (
                <div className="flex items-center gap-2">
                    <OrderStatus status={previousStatus} />
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <OrderStatus status={status} />
                </div>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Current Status" />,
        cell: ({ row }) => {
            const { status } = row.original
            return <OrderStatus status={status} />
        },
    },
    {
        accessorKey: 'transactionAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction Date" />,
        cell: ({ row }) => {
            const { transactionAt } = row.original
            return (
                <div className="flex flex-col">
                    <div className="font-medium">{formatTime(transactionAt)}</div>
                    <div className="text-sm text-muted-foreground">{transactionAt.toLocaleDateString()}</div>
                </div>
            )
        },
    },
]

interface OrderTransactionTableProps {
    orderTransactions: OrderTransactionWith<['order' | 'updatedByUser']>[]
}

export default function OrderTransactionTable({ orderTransactions }: OrderTransactionTableProps) {
    const table = useReactTable<OrderTransactionWith<['order' | 'updatedByUser']>>({
        data: orderTransactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Order Transactions</h2>
                    <span className="text-sm text-muted-foreground">({orderTransactions.length} transactions)</span>
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </div>
    )
}
