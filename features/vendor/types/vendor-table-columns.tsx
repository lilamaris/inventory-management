import z from 'zod'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { vendorSchema } from '@/features/vendor/types/vendor'

export const vendorColumns: ColumnDef<z.infer<typeof vendorSchema>>[] = [
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
