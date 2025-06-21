import { getPurchaseOrders } from '@/features/order/service/order'
import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import OrderCard from '@/features/order/components/order-card'

export default async function MyOrderPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/authlogin')
    }

    const purchaseOrders = await getPurchaseOrders({ userId: user.id })

    return (
        <>
            <h1>My Order List</h1>
            {purchaseOrders.map((order, index) => (
                <OrderCard key={order.id} order={order} index={index} />
            ))}
        </>
    )
}
