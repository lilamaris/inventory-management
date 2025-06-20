import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/features/order/type'
import formatTime from '@/lib/utils/formatTime'
import { Badge } from '@/components/ui/badge'

export function OrderStatus({ status }: { status: Order['status'] }) {
    switch (status) {
        case 'PENDING':
            return <Badge variant="outline">Pending</Badge>
        case 'REJECTED':
            return <Badge variant="destructive">Rejected</Badge>
        case 'CANCELLED':
            return <Badge variant="destructive">Cancelled</Badge>
        case 'APPROVED':
            return <Badge variant="outline">Approved</Badge>
        case 'DELIVERED':
            return <Badge variant="outline">Delivered</Badge>
        default:
            return <Badge variant="outline">Unknown</Badge>
    }
}

export default function OrderCard({ order }: { order: Order }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order to {order.vendor.name} </CardTitle>
                <CardDescription>Order on {formatTime(order.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <p>Order ID: {order.id}</p>
                        <p>Order Date: {formatTime(order.createdAt)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
