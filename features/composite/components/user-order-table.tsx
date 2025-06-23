'use client'

import * as React from 'react'

import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { formatTime } from '@/lib/utils'
import DataTable from '@/components/data-table'

import { UserOrder } from '@/features/composite/order.dto'
import VendorAvatar from '@/features/vendor/components/vendor-avatar'
import OrderStatus from '@/features/order/components/order-status'
import DataTableColumnHeader from '@/components/data-table-column.header'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DataTableViewOptions from '@/components/data-table-view-options'
import DataTablePagination from '@/components/data-table-pagination'
import { OrderStatus as PrismaOrderStatus } from '@/generated/prisma'
import { getOrderStatus } from '@/features/order/utils'
import { Button } from '@/components/ui/button'
import { Eye, MessageCircle } from 'lucide-react'

export const columns: ColumnDef<UserOrder>[] = [
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
        accessorKey: 'vendor',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Vender" />,
        cell: ({ row }) => {
            const { vendor } = row.original
            return (
                <div className="text-foreground w-fit px-0 text-left">
                    <VendorAvatar vendor={vendor} />
                </div>
            )
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
                <Button variant="ghost" size="icon">
                    <MessageCircle />
                </Button>
                <Button variant="ghost" size="icon">
                    <Eye />
                </Button>
            </div>
        ),
    },
]

export default function UserOrderTable({ orders }: { orders: UserOrder[] }) {
    const [filteredOrders, setFilteredOrders] = React.useState<UserOrder[]>(orders)
    const [status, setStatus] = React.useState<PrismaOrderStatus>(PrismaOrderStatus.PENDING)
    const table = useReactTable<UserOrder>({
        data: filteredOrders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    React.useEffect(() => {
        setFilteredOrders(orders.filter((order) => order.status === status))
    }, [status, orders])

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
