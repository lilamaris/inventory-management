import { redirect } from 'next/navigation'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { getCurrentSession } from '@/lib/server/session'
import OrderCard from '@/features/order/components/order-card'
import { isVendorOwner } from '@/features/vendor/service/ownership'
import { getPurchaseOrders } from '@/features/order/service/order'
import { getVendorById } from '@/features/vendor/service/vendor'

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
    const orders = await getPurchaseOrders({ vendorId })
    const pendingOrders = orders.filter((order) => order.status === 'PENDING')

    return (
        <>
            <h1>Your Vendor List</h1>
            <Card className="flex flex-col gap-2 w-full">
                <CardHeader>
                    <CardTitle>{vendor.name}</CardTitle>
                    <CardDescription>{vendor.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <h1>Pending Orders</h1>
                        <div className="flex flex-col gap-2">
                            {pendingOrders.map((order, index) => (
                                <OrderCard key={order.id} order={order} index={index} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
