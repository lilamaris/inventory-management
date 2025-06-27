import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import { getManagerByUserId, getManagersByVendorId } from '@/features/manager/service'
import ManagerAvatar from '@/features/manager/components/managerAvatar'

export default async function MyVendorManagersPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) redirect('/console')

    const manager = await getManagerByUserId(user.id)
    if (!manager) redirect('/console')

    const managers = await getManagersByVendorId(manager.vendor.id)
    return (
        <div className="flex flex-col gap-4">
            {managers.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                    <ManagerAvatar manager={m} />
                    <div className="flex flex-col">
                        <p className="text-sm font-medium">{m.user.name}</p>
                        <p className="text-sm text-muted-foreground">{m.user.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
