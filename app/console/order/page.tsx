import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import { getUserOrders } from '@/features/order/service'
import UserOrderTable from '@/features/order/components/user-order-table'

export default async function OrderPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const orders = await getUserOrders(user.id)

    return (
        <div>
            <UserOrderTable orders={orders} />
        </div>
    )
}
