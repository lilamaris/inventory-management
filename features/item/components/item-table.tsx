'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { ItemResult } from '@/features/item/api/item'
import * as React from 'react'
import z from 'zod'

import { DataTable } from '@/components/data-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, Plus } from 'lucide-react'
import { TableSkeleton } from '@/components/skeleton/table-skeleton'

const itemSchema = z.object({
    id: z.string(),
    name: z.string(),
    sku: z.string(),
    description: z.string().optional(),
    quantity: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    category: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
    }),
})

const itemColumns: ColumnDef<z.infer<typeof itemSchema>>[] = [
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

export function ItemTableSkeleton() {
    return <TableSkeleton columns={itemColumns.length} />
}

export function ItemTable({ items }: { items: Promise<ItemResult[]> }) {
    const data = z.array(itemSchema).parse(React.use(items))

    return (
        <div className="flex flex-col gap-4">
            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                </TabsList>
                <DataTable columns={itemColumns} data={data} />
            </Tabs>
        </div>
    )
}
