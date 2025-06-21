import { Order } from '@/features/order/type'
import { formatTime } from '@/lib/utils'

export default function UserOrderDescription({ order }: { order: Order }) {
    return (
        <div>
            <p>Order to {order.vendor.name}</p>
            <p>Order at {formatTime(order.createdAt)}</p>
        </div>
    )
}
