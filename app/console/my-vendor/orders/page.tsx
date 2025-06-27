import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import { getVendorOrders } from '@/features/order/service'
import { getManagerByUserId } from '@/features/manager/service'

import VendorOrderTable from '@/features/order/components/vendor-order-table'

export default async function MyVendorOrdersPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) redirect('/console')

    const manager = await getManagerByUserId(user.id)
    if (!manager) redirect('/console')

    const orders = await getVendorOrders(manager.vendor.id)

    return <VendorOrderTable orders={orders} />
}
