import { getVendors } from '@/features/vendor/api/vendor'
import { VendorTable, VendorTableSkeleton } from '@/features/vendor/components/vendor-table'
import { Suspense } from 'react'

export default function Page() {
    const vendors = getVendors()

    return (
        <Suspense fallback={<VendorTableSkeleton />}>
            <VendorTable vendors={vendors} />
        </Suspense>
    )
}
