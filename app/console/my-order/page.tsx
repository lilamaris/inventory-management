import { getOrders } from '@/features/order/service/order'
import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import OrderCard from '@/features/order/components/order-card'
import { Order } from '@/features/order/type'
import UserOrderDescription from '@/features/order/components/user-order-description'
import UserOrderAction from '@/features/order/components/user-order-action'
import OrderRecipe from '@/features/order/components/order-recipe'
import OrderItems from '@/features/order/components/order-items'

export default async function MyOrderPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/authlogin')
    }

    const orders = await getOrders({ userId: user.id })

    const description = (order: Order) => (
        <UserOrderDescription orderAt={order.createdAt} orderToName={order.vendor.name} />
    )
    const action = (order: Order) => (
        <UserOrderAction vendorId={order.vendorId} orderId={order.id} orderStatus={order.status} />
    )

    return (
        <>
            <h1>My Order List</h1>
            {orders.map((order, index) => (
                <OrderRecipe key={order.id} order={order} index={index} description={description} action={action}>
                    <OrderItems items={order.items} />
                </OrderRecipe>
            ))}
        </>
    )
}
