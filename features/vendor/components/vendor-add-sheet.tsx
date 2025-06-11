'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import type { CreateVendorState } from '@/features/vendor/types/vendor'
import { createVendorSchema } from '@/features/vendor/types/vendor'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { createVendorAction } from '../actions/vendor'
import * as React from 'react'

export interface VendorAddSheetProps extends React.HTMLAttributes<HTMLDivElement> {
    openSheetButton?: () => React.ReactNode
}

export function VendorAddSheet({ className, openSheetButton, ...props }: VendorAddSheetProps) {
    const [sheetOpen, setSheetOpen] = React.useState(false)
    const [state, formAction, isPending] = React.useActionState<CreateVendorState, FormData>(
        createVendorAction,
        undefined,
    )
    const form = useForm<z.infer<typeof createVendorSchema>>({
        resolver: zodResolver(createVendorSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    React.useEffect(() => {
        if (state?.success) {
            setSheetOpen(false)
            form.reset()
            console.log('success')
        }
    }, [state?.success])

    const formId = React.useId()

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                {openSheetButton ? (
                    openSheetButton()
                ) : (
                    <Button>
                        <Plus />
                        <span>Add Vendor</span>
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add a new vendor</SheetTitle>
                    <SheetDescription>
                        Registering a new vendor will allow you to create purchase orders for their products.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form id={formId} className={cn('grid gap-6', className)} action={formAction}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            defaultValue={state?.formData?.get('name') as string}
                                        />
                                    </FormControl>
                                    {state?.errors?.name && <FormMessage>{state.errors.name}</FormMessage>}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            {...field}
                                            defaultValue={state?.formData?.get('description') as string}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <SheetFooter className="shrink-0">
                    <Button type="submit" form={formId} disabled={isPending}>
                        {isPending && <Loader2 className="size-4 animate-spin" />}
                        Add Vendor
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
