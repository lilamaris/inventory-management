'use client'

import * as React from 'react'
import { z } from 'zod'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { ActionState } from '@/lib/types'
import { Label } from '@/components/ui/label'

export interface VendorFormProps<TAction extends z.ZodType> extends React.FormHTMLAttributes<HTMLFormElement> {
    defaultValue?: z.infer<TAction>
    id: string
    state: ActionState<TAction>
    isPending: boolean
}
export function VendorForm<TSchema extends z.ZodType>({
    className,
    defaultValue,
    state,
    isPending,
    ...props
}: VendorFormProps<TSchema>) {
    return (
        <form className={cn('grid gap-6', className)} {...props}>
            <div className="flex flex-col gap-2">
                <Label>
                    <span>Name</span>
                </Label>
                <Input name="name" autoComplete="off" defaultValue={defaultValue?.name} />
                {state?.errors?.name && <span className="text-destructive">{state.errors.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <Label>
                    <span>Description</span>
                </Label>
                <Textarea name="description" className="resize-none" defaultValue={defaultValue?.description} />
                {state?.errors?.description && <span className="text-destructive">{state.errors.description}</span>}
            </div>
            <input type="hidden" name="id" value={defaultValue?.id} />
        </form>
    )
}
