'use client'

import * as React from 'react'
import z from 'zod'

import { DataTable } from '@/components/data-table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import type { ItemResult } from '@/features/item/api/item'
import { itemSchema } from '@/features/item/types/item'
import { itemColumns } from '@/features/item/types/item-table-columns'

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
