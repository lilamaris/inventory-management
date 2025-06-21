import { getVendorById } from '@/features/vendor/service/vendor'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import OrderTable from '@/features/order/components/order-table'
import { getOrders } from '@/features/order/service/order'

export default async function VendorOrderLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ vendorId: string }>
}) {
    const { vendorId } = await params
    const vendor = await getVendorById(vendorId)
    if (!vendor) {
        redirect('/console')
    }
    const orders = await getOrders({ vendorId })
    return (
        <div className="flex flex-col gap-6">
            <div className="flex-1">{children}</div>

            <div className="flex flex-1 flex-col gap-2">
                <Card>
                    <CardContent>
                        <OrderTable orders={orders} vendorId={vendorId} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
