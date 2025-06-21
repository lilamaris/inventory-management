import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/lib/server/session'
import { isVendorOwner } from '@/features/vendorManager/service/ownership'
import { getOrders } from '@/features/order/service/order'
import { getVendorById } from '@/features/vendor/service/vendor'
import OrderRecipe from '@/features/order/components/order-recipe'
import VendorOrderAction from '@/features/order/components/vendor-order-action'
import VendorOrderDescription from '@/features/order/components/vendor-order-description'
import { Order } from '@/features/order/type'
import OrderItems from '@/features/order/components/order-items'

export default async function VendorOrderPage({ params }: { params: Promise<{ vendorId: string }> }) {
    const { vendorId } = await params

    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/authlogin')
    }

    if (!(await isVendorOwner(user.id, vendorId))) {
        redirect('/console')
    }

    const vendor = await getVendorById(vendorId)
    if (!vendor) {
        redirect('/console')
    }
    const orders = await getOrders({ vendorId })

    const description = (order: Order) => (
        <VendorOrderDescription orderAt={order.createdAt} orderFromName={order.orderByUser.name} />
    )
    const action = (order: Order) => (
        <VendorOrderAction vendorId={order.vendorId} orderId={order.id} orderStatus={order.status} />
    )

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                {orders.map((order, index) => (
                    <OrderRecipe key={order.id} order={order} index={index} description={description} action={action}>
                        <OrderItems items={order.items} />
                    </OrderRecipe>
                ))}
            </div>
        </div>
    )
}
