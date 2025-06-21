'use client'

import { Button } from '@/components/ui/button'

export default function OrderHandler({ orderId }: { orderId: string }) {
    return (
        <>
            <Button>Approve</Button>
            <Button variant="destructive" type="submit">
                Reject
            </Button>
        </>
    )
}
