'use client'

import * as React from 'react'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'

import { formatTime } from '@/lib/utils'

import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import DataTable from '@/components/data-table'
import DataTableColumnHeader from '@/components/data-table-column.header'
import DataTableViewOptions from '@/components/data-table-view-options'
import DataTablePagination from '@/components/data-table-pagination'

import { ItemWithPartial } from '@/features/item/dto.composite'
import ItemAvatar from '@/features/item/components/item-avatar'

export const columns: ColumnDef<ItemWithPartial<['category' | 'orderItems']>>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Item" />,
        cell: ({ row }) => {
            const item = row.original
            return <ItemAvatar item={item} />
        },
    },
    {
        accessorKey: 'sku',
        header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
        cell: ({ row }) => <div className="font-mono text-sm">{row.getValue('sku')}</div>,
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
        cell: ({ row }) => {
            const { quantity } = row.original
            return (
                <div className="text-center">
                    <span className={quantity > 0 ? 'text-green-600' : 'text-red-600'}>{quantity}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({ row }) => {
            const { price } = row.original
            return (
                <div className="text-right">
                    {price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </div>
            )
        },
    },
    {
        accessorKey: 'orderItems',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order Items" />,
        cell: ({ row }) => {
            const { orderItems } = row.original
            return <div>{orderItems?.length ?? 0} orders</div>
        },
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
        cell: ({ row }) => {
            const { createdAt } = row.original
            return <div className="text-sm text-muted-foreground">{formatTime(createdAt)}</div>
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const item = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Item
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
]

interface ItemTableProps {
    items: ItemWithPartial<['category' | 'orderItems']>[]
}

export default function ItemTable({ items }: ItemTableProps) {
    const table = useReactTable<ItemWithPartial<['category' | 'orderItems']>>({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Items</h2>
                    <span className="text-sm text-muted-foreground">({items.length} items)</span>
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </div>
    )
}
