import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/lib/server/session'
import { isVendorOwner } from '@/features/vendorManager/service/ownership'
import { getOrderById } from '@/features/order/service/order'
import { getVendorById } from '@/features/vendor/service/vendor'
import OrderRecipe from '@/features/order/components/order-recipe'
import VendorOrderAction from '@/features/order/components/vendor-order-action'
import VendorOrderDescription from '@/features/order/components/vendor-order-description'
import { Order } from '@/features/order/type'
import OrderItems from '@/features/order/components/order-items'

export interface PathParams {
    params: Promise<{ vendorId: string; orderId: string }>
}
export default async function VendorOrderPage({ params }: PathParams) {
    const { vendorId, orderId } = await params

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
    const inspectOrder = await getOrderById(orderId)

    const description = (order: Order) => <VendorOrderDescription order={order} />

    const action = (order: Order) => <VendorOrderAction order={order} />

    return (
        <div className="flex flex-col gap-2">
            {inspectOrder && (
                <OrderRecipe
                    key={inspectOrder.id}
                    order={inspectOrder}
                    index={0}
                    description={description}
                    action={action}
                >
                    <OrderItems items={inspectOrder.items} />
                </OrderRecipe>
            )}
        </div>
    )
}
