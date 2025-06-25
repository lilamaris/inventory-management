import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import { getOwnVendorByUserId } from '@/features/manager/service'
import { getItemsByVendorId } from '@/features/item/service'
import ItemTable from '@/features/item/components/item-table'

export default async function MyVendorItemsPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) redirect('/console')

    const vendor = await getOwnVendorByUserId(user.id)
    if (!vendor) redirect('/console')

    const items = await getItemsByVendorId(vendor.id)
    return <ItemTable items={items} />
}
