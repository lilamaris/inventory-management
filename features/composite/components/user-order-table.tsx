'use client'

import { ColumnDef } from '@tanstack/react-table'
import { formatTime } from '@/lib/utils'
import DataTable from '@/components/data-table'

import { UserOrder } from '@/features/composite/order.dto'
import VendorAvatar from '@/features/vendor/components/vendor-avatar'
import OrderStatus from '@/features/order/components/order-status'
import DataTableColumnHeader from '@/components/data-table-column.header'
import { Checkbox } from '@/components/ui/checkbox'

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
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        cell: ({ row }) => {
            const { createdAt } = row.original
            return <div>{formatTime(createdAt)}</div>
        },
    },
    {
        accessorKey: 'orderItems',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Summary" />,
        cell: ({ row }) => {
            const { orderItems } = row.original
            return (
                <div>
                    {orderItems.reduce((acc, item) => acc + item.quantity, 0)} of {orderItems.length} items
                </div>
            )
        },
    },
]

export default function UserOrderTable({ orders }: { orders: UserOrder[] }) {
    return <DataTable columns={columns} data={orders} />
}
