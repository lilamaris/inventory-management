import { getVendors } from '@/features/composite/vendor.service'
import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import VendorCard from '@/features/composite/components/vendor-card'

export default async function VendorsPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const vendors = await getVendors()

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
            ))}
        </div>
    )
}
