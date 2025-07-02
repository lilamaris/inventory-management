import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import { getManagerByUserId } from '@/features/manager/service'
import { getItemsByVendorId } from '@/features/item/service'
import ItemTable from '@/features/item/components/item-table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Package } from 'lucide-react'
import { getCategoriesByVendorId } from '@/features/category/service'

export default async function MyVendorItemsPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) redirect('/console')

    const manager = await getManagerByUserId(user.id)
    if (!manager) redirect('/console')

    const items = await getItemsByVendorId(manager.vendor.id)
    const categories = await getCategoriesByVendorId(manager.vendor.id)
    return (
        <>
            <div className="flex items-center gap-6">
                <Card className="flex-1">
                    <CardHeader className="flex items-center gap-2">
                        <Package /> 아이템
                    </CardHeader>
                    <CardContent>{items.length}</CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader className="flex items-center gap-2">
                        <Package /> 카테고리
                    </CardHeader>
                    <CardContent>{categories.length}</CardContent>
                </Card>
                <Card className="flex-1">
                    <CardContent></CardContent>
                </Card>
                <Card className="flex-1">
                    <CardContent></CardContent>
                </Card>
            </div>
            <Card>
                <CardContent>
                    <ItemTable items={items} />
                </CardContent>
            </Card>
        </>
    )
}
