import { Suspense } from 'react'

import { DataTable } from '@/components/data-table'
import { findItems } from '@/features/item/api/item'
import { ColumnDef } from '@tanstack/react-table'
import z from 'zod'
import { Item } from '@prisma/client'

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
    purchaseOrderCount: z.number().optional(),
    salesOrderCount: z.number().optional(),
})

const itemColumns: ColumnDef<z.infer<typeof itemSchema>>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'sku',
        header: 'SKU',
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            return <div className="line-clamp-2">{row.original.description}</div>
        },
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
]

export function ItemTable({ items }: { items: Item[] }) {
    const itemData = z.array(itemSchema).parse(items)

    return (
        <Suspense>
            <DataTable columns={itemColumns} data={itemData} />
        </Suspense>
    )
}
