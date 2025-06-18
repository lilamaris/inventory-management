'use client'

import * as React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import useSWR from 'swr'
import { VendorForm } from './vendor-form'
import { CreateVendorState, UpdateVendorState } from '../types/vendor'
import { createVendorAction, updateVendorAction } from '../actions/vendor'
import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VendorFormSkeleton } from './skeleton/vendor-form-skeleton'

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

export interface VendorInspect {
    vendorId?: string
    sheetTitle: string
    sheetDescription: string
}

export interface VendorInspectSheetProps {
    inspectVendor: VendorInspect | null
    onChangeInspectVendor: (vendor: VendorInspect | null) => void
}

export function VendorAddForm() {
    const formId = React.useId()
    const [state, formAction, isPending] = React.useActionState<CreateVendorState, FormData>(
        createVendorAction,
        undefined,
    )

    return (
        <>
            <div className="px-4">
                <VendorForm id={formId} action={formAction} state={state} isPending={isPending} />
            </div>
            <SheetFooter>
                <Button type="submit" form={formId} disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save
                </Button>
                <SheetClose asChild>
                    <Button variant="outline" type="button" disabled={isPending}>
                        Cancel
                    </Button>
                </SheetClose>
            </SheetFooter>
        </>
    )
}

export function VendorUpdateForm({ vendorId }: { vendorId: string }) {
    const formId = React.useId()
    const { data, error, isLoading, mutate } = useSWR(`/api/vendors/${vendorId}`, fetcher, {
        revalidateOnMount: true,
    })
    const [state, formAction, isPending] = React.useActionState<UpdateVendorState, FormData>(
        updateVendorAction,
        undefined,
    )

    if (isLoading) {
        return (
            <div className="px-4">
                <VendorFormSkeleton />
            </div>
        )
    }

    if (error) {
        return <div>Error loading vendor</div>
    }

    return (
        <>
            <div className="px-4">
                <VendorForm
                    defaultValue={data}
                    id={formId}
                    action={(formData) => {
                        formData.append('id', vendorId)
                        formAction(formData)
                    }}
                    state={state}
                    isPending={isPending}
                />
            </div>
            <SheetFooter>
                <Button type="submit" form={formId} disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save
                </Button>
                <SheetClose asChild>
                    <Button variant="outline" type="button" disabled={isPending}>
                        Cancel
                    </Button>
                </SheetClose>
            </SheetFooter>
        </>
    )
}

export function VendorInspectSheet({ inspectVendor, onChangeInspectVendor }: VendorInspectSheetProps) {
    return (
        <Sheet open={!!inspectVendor} onOpenChange={() => onChangeInspectVendor(null)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{inspectVendor?.sheetTitle}</SheetTitle>
                    <SheetDescription>{inspectVendor?.sheetDescription}</SheetDescription>
                </SheetHeader>
                {inspectVendor?.vendorId && <VendorUpdateForm vendorId={inspectVendor.vendorId} />}
                {!inspectVendor?.vendorId && <VendorAddForm />}
            </SheetContent>
        </Sheet>
    )
}
