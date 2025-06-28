import { redirect } from 'next/navigation'
import { getCurrentSession } from '@/lib/server/session'
import { getManagerByUserId } from '@/features/manager/service'
import OrderTransactionTable from '@/features/orderTransaction/components/orderTransactionTable'
import { getOrderTransactionsByVendorId } from '@/features/orderTransaction/service'

export default async function FulfillmentPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) redirect('/login')

    const manager = await getManagerByUserId(user.id)
    if (!manager) redirect('/console')

    const orderTransactions = await getOrderTransactionsByVendorId(manager.vendorId)

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Fulfillment</h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Orders</h2>
                <OrderTransactionTable orderTransactions={orderTransactions} />
            </div>
        </div>
    )
}
