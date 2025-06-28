'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Order } from '@/features/order/dto.primitive'
import { OrderStatus } from '@prisma/client'
import updateOrderStatus from '@/features/order/actions'

export interface OrderFormFieldProps {
    defaultValue: Order | null
}
export default function OrderFormField(props: OrderFormFieldProps) {
    const [state, formAction, isPending] = React.useActionState(updateOrderStatus, undefined)
    const { defaultValue } = props
    const formId = React.useId()
    const errors = state?.errors
    return (
        <>
            <form id={formId} action={formAction}>
                <div className="flex flex-col gap-2">
                    <Label>Status</Label>
                    <Select name="status">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                            <SelectItem value={OrderStatus.APPROVED}>Approved</SelectItem>
                            <SelectItem value={OrderStatus.REJECTED}>Rejected</SelectItem>
                            <SelectItem value={OrderStatus.DELIVERED}>Delivered</SelectItem>
                        </SelectContent>
                    </Select>
                    {state?.message && <p className="text-xs text-destructive">{state.message}</p>}
                    {errors?.status && <p className="text-xs text-destructive">{errors.status}</p>}
                    {errors?.orderId && <p className="text-xs text-destructive">{errors.orderId}</p>}
                    {errors?.vendorId && <p className="text-xs text-destructive">{errors.vendorId}</p>}
                    <input type="hidden" name="orderId" value={defaultValue?.id} />
                    <input type="hidden" name="vendorId" value={defaultValue?.vendorId} />
                </div>
            </form>
            <div className="mt-auto flex flex-col gap-2">
                <Button form={formId} type="submit" disabled={isPending}>
                    Save
                </Button>
            </div>
        </>
    )
}
