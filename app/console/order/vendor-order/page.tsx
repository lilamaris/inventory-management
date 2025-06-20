import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getPurchaseOrders } from '@/features/order/service/order'
import { getOwnVendor } from '@/features/vendor/service/ownership'
import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

export default async function VendorOrderPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/authlogin')
    }

    const ownVendor = await getOwnVendor(user.id)
    const vendorOrder = await getPurchaseOrders({ vendorId: ownVendor[0].id })

    return (
        <>
            <h1>Your Vendor List</h1>
            {ownVendor.map((vendor) => (
                <Card key={vendor.id} className="flex flex-col gap-2 w-full">
                    <CardHeader>
                        <CardTitle>{vendor.name}</CardTitle>
                        <CardDescription>{vendor.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{vendorOrder.length} orders</p>
                        <Button variant="outline">View Orders</Button>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
