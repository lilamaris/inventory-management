'use client'

import * as React from 'react'
import { MoreHorizontal, Eye, Star, MapPin, Package } from 'lucide-react'

import { formatTime } from '@/lib/utils'

import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import Checkbox from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

import { Vendor } from '@/features/composite/vendor.dto'
import VendorAvatar from '@/features/vendor/components/vendor-avatar'

export const columns: ColumnDef<Vendor>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Vendor" />,
        cell: ({ row }) => {
            const vendor = row.original
            return <VendorAvatar vendor={vendor} />
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        cell: ({ row }) => {
            const { description } = row.original
            return (
                <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {description || 'No description'}
                </div>
            )
        },
    },
    {
        accessorKey: 'categories',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Categories" />,
        cell: ({ row }) => {
            const { categories } = row.original
            return (
                <div className="flex flex-wrap gap-1">
                    {categories.slice(0, 2).map((category) => (
                        <Badge key={category.id} variant="secondary" className="text-xs">
                            {category.name}
                        </Badge>
                    ))}
                    {categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                            +{categories.length - 2}
                        </Badge>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'items',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
        cell: ({ row }) => {
            const { items } = row.original
            return (
                <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{items.length} items</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'managers',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Managers" />,
        cell: ({ row }) => {
            const { managers } = row.original
            return (
                <div className="flex items-center gap-1">
                    <span className="text-sm">{managers.length} managers</span>
                </div>
            )
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
            const vendor = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(vendor.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <MapPin className="mr-2 h-4 w-4" />
                            View Items
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            Add to Favorites
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            <MoreHorizontal className="mr-2 h-4 w-4" />
                            More Options
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
]

interface VendorTableProps {
    vendors: Vendor[]
}

export default function VendorTable({ vendors }: VendorTableProps) {
    const table = useReactTable<Vendor>({
        data: vendors,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Vendors</h2>
                    <span className="text-sm text-muted-foreground">({vendors.length} vendors)</span>
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </div>
    )
}
