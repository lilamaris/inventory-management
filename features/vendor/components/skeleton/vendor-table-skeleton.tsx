import { TableSkeleton } from '@/components/skeleton/table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { vendorColumns } from '@/features/vendor/types/vendor-table-columns'

export function VendorTableSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="ml-auto h-8 w-16" />
                <Skeleton className="h-8 w-32" />
            </div>
            <TableSkeleton columns={vendorColumns.length} />
        </div>
    )
}
