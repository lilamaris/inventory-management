'use client'

import * as React from 'react'
import z from 'zod'
import { ColumnDef, RowData } from '@tanstack/react-table'

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { TableSkeleton } from '@/components/skeleton/table-skeleton'
import { DataTable } from '@/components/data-table'
import { Filter, MoreVertical, Plus } from 'lucide-react'

import { VendorResult } from '@/features/vendor/api/vendor'
import { VendorInspect, VendorInspectSheet } from './vendor-inspect-sheet'

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
            return <div className="text-sm">{row.original.purchaseOrders ?? 0} order exists</div>
        },
    },
    {
        id: 'actions',
        cell: ({ row, table }) => {
            const handleEdit = () => {
                table.options.meta?.setInspectVendor({
                    sheetTitle: 'Edit Vendor',
                    sheetDescription: 'Edit the vendor details',
                    vendorId: row.original.id,
                })
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        setInspectVendor: (props: VendorInspect) => void
    }
}

export function VendorTableSkeleton() {
    return <TableSkeleton columns={vendorColumns.length} />
}

export function VendorTable({ vendors }: { vendors: Promise<VendorResult[]> }) {
    const data = z.array(vendorSchema).parse(React.use(vendors))
    const [inspectVendor, setInspectVendor] = React.useState<VendorInspect | null>(null)

    const tableMeta = {
        setInspectVendor: (props: VendorInspect) => {
            setInspectVendor(props)
        },
    }

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
                    <Button
                        onClick={() =>
                            setInspectVendor({
                                sheetTitle: 'Add Vendor',
                                sheetDescription:
                                    'Registering a new vendor will allow you to create purchase orders for their products.',
                            })
                        }
                    >
                        <Plus />
                        <span>Add Vendor</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <DataTable<(typeof data)[number], string, typeof tableMeta>
                    columns={vendorColumns}
                    data={data}
                    meta={tableMeta}
                />
            </TabsContent>
            <VendorInspectSheet inspectVendor={inspectVendor} onChangeInspectVendor={setInspectVendor} />
        </Tabs>
    )
}
