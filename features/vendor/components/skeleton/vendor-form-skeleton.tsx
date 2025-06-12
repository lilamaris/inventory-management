import { SingleInputFieldSkeleton } from '@/components/skeleton/single-input-skeleton'
import { SingleTextareaSkeleton } from '@/components/skeleton/single-textarea-skeleton'

export function VendorFormSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            <SingleInputFieldSkeleton />
            <SingleTextareaSkeleton />
        </div>
    )
}
