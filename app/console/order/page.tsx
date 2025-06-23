import { getCurrentSession } from '@/lib/server/session'
import { notFound, redirect } from 'next/navigation'

import { getUserOrders } from '@/features/composite/order.service'
import UserOrderTable from '@/features/composite/components/user-order-table'

export interface PathParams {
    params: Promise<{ orderStatus: string }>
}
export default async function OrderPage({ params }: PathParams) {
    const { orderStatus } = await params

    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const orders = await getUserOrders({ userId: user.id })

    return (
        <div>
            <UserOrderTable orders={orders} />
        </div>
    )
}
