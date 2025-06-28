import { OrderStatus as PrismaOrderStatus } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from 'lucide-react'

export default function OrderStatus({ status }: { status: PrismaOrderStatus }) {
    switch (status) {
        case 'PENDING':
            return (
                <Badge variant="outline" className="text-warning-foreground bg-warning">
                    <BadgeInfo />
                    Pending
                </Badge>
            )
        case 'REJECTED':
            return (
                <Badge variant="destructive" className="text-destructive-foreground bg-destructive">
                    <BadgeAlert />
                    Rejected
                </Badge>
            )
        case 'CANCELLED':
            return (
                <Badge variant="destructive" className="text-destructive-foreground bg-destructive">
                    <BadgeX />
                    Cancelled
                </Badge>
            )
        case 'APPROVED':
            return (
                <Badge variant="outline" className="text-info-foreground bg-info">
                    <BadgeCheck />
                    Approved
                </Badge>
            )
        case 'DELIVERED':
            return (
                <Badge variant="outline" className="text-success-foreground bg-success">
                    <BadgeCheck />
                    Delivered
                </Badge>
            )
        default:
            return <Badge variant="outline">Unknown</Badge>
    }
}
