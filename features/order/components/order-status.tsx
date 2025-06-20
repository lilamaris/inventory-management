import { Badge } from '@/components/ui/badge'
import { BadgeAlert, BadgeInfo, BadgeX } from 'lucide-react'

import { Order } from '@/features/order/type'

export default function OrderStatus({ status }: { status: Order['status'] }) {
    switch (status) {
        case 'PENDING':
            return (
                <Badge variant="outline">
                    <BadgeInfo />
                    Pending
                </Badge>
            )
        case 'REJECTED':
            return (
                <Badge variant="destructive">
                    <BadgeAlert />
                    Rejected
                </Badge>
            )
        case 'CANCELLED':
            return (
                <Badge variant="destructive">
                    <BadgeX />
                    Cancelled
                </Badge>
            )
        case 'APPROVED':
            return <Badge variant="outline">Approved</Badge>
        case 'DELIVERED':
            return <Badge variant="outline">Delivered</Badge>
        default:
            return <Badge variant="outline">Unknown</Badge>
    }
}
