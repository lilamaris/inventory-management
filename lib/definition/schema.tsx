'use client'

import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'
import { formatDate } from '../utils'

const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    sku: z.string(),
    description: z.string().nullable(),
    quantity: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const productColumns: ColumnDef<z.infer<typeof productSchema>>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'sku',
        header: 'SKU',
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            return <div>{formatDate(row.original.createdAt)}</div>
        },
    },
    {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell: ({ row }) => {
            return <div>{formatDate(row.original.updatedAt)}</div>
        },
    },
]
