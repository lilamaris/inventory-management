import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'
import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { itemSchema } from '@/features/item/types/item'

export const itemColumns: ColumnDef<z.infer<typeof itemSchema>>[] = [
    {
        accessorKey: 'sku',
        header: 'SKU',
        enableHiding: true,
        cell: ({ row }) => {
            return <div className="text-xs">{row.original.sku}</div>
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
        enableHiding: true,
        cell: ({ row }) => {
            return (
                <div className="line-clamp-2">
                    {row.original.description ? (
                        row.original.description
                    ) : (
                        <span className="text-muted-foreground">No description</span>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
        enableHiding: true,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        enableHiding: true,
        cell: ({ row }) => {
            return <div className="line-clamp-2">{row.original.category.name}</div>
        },
    },
    {
        id: 'actions',
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        ),
    },
]
