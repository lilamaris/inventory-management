import { Skeleton } from '@/components/ui/skeleton'

export function TableSkeleton({ columns }: { columns: number }) {
    return (
        <div className="rounded-md border overflow-hidden grid">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex gap-4 p-3 not-last:border-b first:bg-muted/50">
                    {Array.from({ length: columns }).map((_, i) => (
                        <Skeleton key={i} className="h-5 w-full" />
                    ))}
                </div>
            ))}
        </div>
    )
}
