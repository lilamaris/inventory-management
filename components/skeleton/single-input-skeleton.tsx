import { Skeleton } from '@/components/ui/skeleton'

export function SingleInputFieldSkeleton() {
    return (
        <div className="grid gap-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    )
}
