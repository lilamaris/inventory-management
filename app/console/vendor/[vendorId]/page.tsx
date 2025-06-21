import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
        <div className="flex flex-col gap-6">
            <h1>{vendor.name}</h1>
            <p>{vendor.description}</p>
            <p>Managers: {vendor.managers.map((manager) => manager.user.name).join(', ')}</p>
            <p>Purchase Orders: {vendor.purchaseOrders.length}</p>
            <Card>
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of items provided by the vendor.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendor.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price * item.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
