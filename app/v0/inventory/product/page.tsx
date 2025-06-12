import { getItems } from '@/features/item/api/item'
import { ItemTable } from '@/features/item/components/item-table'
import { ItemTableSkeleton } from '@/features/item/components/skeleton/item-table-skeleton'
import { auth } from '@/lib/auth'
import { Suspense } from 'react'

export default async function Page() {
    const session = await auth()
    const items = getItems()

    return (
        <>
            <Suspense fallback={<ItemTableSkeleton />}>
                <ItemTable items={items} />
            </Suspense>
        </>
    )
}
