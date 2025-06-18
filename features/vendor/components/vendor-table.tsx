'use client'

import * as React from 'react'
import z from 'zod'
import { RowData } from '@tanstack/react-table'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { Filter, Plus } from 'lucide-react'

import { VendorResult } from '@/features/vendor/api/vendor'
import { VendorInspect, VendorInspectSheet } from './vendor-inspect-sheet'
import { vendorSchema } from '../types/vendor'
import { vendorColumns } from '../types/vendor-table-columns'

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        setInspectVendor: (props: VendorInspect) => void
    }
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
