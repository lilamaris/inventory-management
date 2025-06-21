import { Order } from '@/features/order/type'
import { formatTime } from '@/lib/utils'

export default function VendorOrderDescription({ order }: { order: Order }) {
    return (
        <div>
            <p>Order from {order.orderByUser.name}</p>
            <p>Order at {formatTime(order.createdAt)}</p>
        </div>
    )
}
