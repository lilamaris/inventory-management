import { Skeleton } from '../ui/skeleton'

export function SingleTextareaSkeleton() {
    return (
        <div className="grid gap-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
    )
}
