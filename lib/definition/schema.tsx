// 'use client'

// import { ColumnDef } from '@tanstack/react-table'
// import { z } from 'zod'
// import { formatDate } from '../utils'
// import { Button } from '@/components/ui/button'
// import { ArrowUpDown } from 'lucide-react'

// const productSchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     sku: z.string(),
//     description: z.string().nullable(),
//     quantity: z.number(),
//     createdAt: z.date(),
//     updatedAt: z.date(),
// })

// export const productColumns: ColumnDef<z.infer<typeof productSchema>>[] = [
//     {
//         accessorKey: 'name',
//         header: 'Name',
//     },
//     {
//         accessorKey: 'sku',
//         header: 'SKU',
//     },
//     {
//         accessorKey: 'quantity',
//         header: ({ column }) => {
//             return (
//                 <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
//                     Quantity
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => <div className="text-center">{row.getValue('quantity')}</div>,
//     },
//     {
//         accessorKey: 'createdAt',
//         header: 'Created At',
//         cell: ({ row }) => {
//             return <div>{formatDate(row.original.createdAt)}</div>
//         },
//     },
//     {
//         accessorKey: 'updatedAt',
//         header: 'Updated At',
//         cell: ({ row }) => {
//             return <div>{formatDate(row.original.updatedAt)}</div>
//         },
//     },
// ]
