import { getVendors } from '@/features/vendor/api/vendor'
import { VendorTable } from '@/features/vendor/components/vendor-table'
import { VendorTableSkeleton } from '@/features/vendor/components/skeleton/vendor-table-skeleton'
import { Suspense } from 'react'

export default function Page() {
    const vendors = getVendors()

    return (
        <Suspense fallback={<VendorTableSkeleton />}>
            <VendorTable vendors={vendors} />
        </Suspense>
    )
}
