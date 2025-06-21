import { getCurrentSession } from '@/lib/server/session'
import { isVendorOwner } from '@/features/vendorManager/service/ownership'
import { redirect } from 'next/navigation'

export default async function VendorOrderPage({ params }: { params: Promise<{ vendorId: string }> }) {
    const { vendorId } = await params
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/authlogin')
    }

    if (!(await isVendorOwner(user.id, vendorId))) {
        redirect('/console')
    }

    return <div>Order List</div>
}
