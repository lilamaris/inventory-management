import { getItems } from '@/features/item/api/item'
import { ItemTable, ItemTableSkeleton } from '@/features/item/components/item-table'
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
