import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getVendorById, getVendorWithPurchaseOrdersById } from '@/features/vendor/service/vendor'
import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

export interface PathParams {
    vendorId: string
}
export default async function VendorPage({ params }: { params: PathParams }) {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const vendor = await getVendorById(params.vendorId)
    if (!vendor) {
        redirect('/console/vendor')
    }

    return (
        <div>
            <h1>{vendor.name}</h1>
            <p>{vendor.description}</p>
            <p>Managers: {vendor.managers.map((manager) => manager.user.name).join(', ')}</p>
            <p>Purchase Orders: {vendor.purchaseOrders.length}</p>
            <Card>
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        {vendor.items.map((item) => (
                            <div key={item.id}>{item.name}</div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
