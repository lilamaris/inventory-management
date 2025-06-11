'use client'

import * as React from 'react'
import z from 'zod'
import { ColumnDef } from '@tanstack/react-table'

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { TableSkeleton } from '@/components/skeleton/table-skeleton'
import { DataTable } from '@/components/data-table'
import { Filter, MoreVertical } from 'lucide-react'

import { VendorResult } from '@/features/vendor/api/vendor'
import { VendorAddSheet } from './vendor-add-sheet'
import { VendorPurchaseOrderSheet } from './vendor-purchase-order-sheet'

const vendorSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    purchaseOrders: z.number().optional(),
})

const vendorColumns: ColumnDef<z.infer<typeof vendorSchema>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    name="select-all"
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    name="select-row"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            return <div className="text-sm">{row.original.name}</div>
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            return <div className="text-sm">{row.original.description}</div>
        },
    },
    {
        accessorKey: 'purchaseOrders',
        header: 'Purchase Orders',
        cell: ({ row }) => {
            return row.original.purchaseOrders ? (
                <VendorPurchaseOrderSheet
                    vendorId={row.original.id}
                    openSheetButton={() => (
                        <Button variant="outline" size="sm">
                            Have {row.original.purchaseOrders} Order
                        </Button>
                    )}
                />
            ) : (
                <div className="text-sm">No purchase orders</div>
            )
        },
    },
    {
        id: 'actions',
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function VendorTableSkeleton() {
    return <TableSkeleton columns={vendorColumns.length} />
}

export function VendorTable({ vendors }: { vendors: Promise<VendorResult[]> }) {
    const data = z.array(vendorSchema).parse(React.use(vendors))

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Filter />
                            </Button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    <VendorAddSheet className="px-4" />
                </div>
            </div>
            <TabsContent value="all">
                <DataTable columns={vendorColumns} data={data} />
            </TabsContent>
            <TabsContent value="pending"></TabsContent>
        </Tabs>
    )
}
