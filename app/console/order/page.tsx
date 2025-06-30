import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import { getUserOrders } from '@/features/order/service'
import UserOrderTable from '@/features/order/components/user-order-table'
import InfoSection from '@/components/layout/info-section'

export default async function OrderPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const orders = await getUserOrders(user.id)

    const orderDescriptions = [
        '이 페이지에서는 본인이 주문한 모든 주문 내역을 확인할 수 있습니다.',
        '상단의 탭을 통해 주문 상태별로 필터링할 수 있습니다 (Pending, Approved, Rejected, Delivered).',
        'Vendor 열에서는 주문한 판매자 정보를 확인할 수 있습니다.',
        'Status 열에서는 현재 주문의 진행 상태를 한눈에 확인할 수 있습니다.',
        'Total 열에서는 주문 총액을 확인할 수 있습니다.',
        'Items 열에서는 주문한 상품의 총 개수를 확인할 수 있습니다.',
        'Actions 버튼을 통해 주문 상세보기 및 판매자와의 메시지 기능을 사용할 수 있습니다.',
        '체크박스를 통해 여러 주문을 선택하여 일괄 작업을 수행할 수 있습니다.',
    ]

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">주문 내역</h1>
                <InfoSection title="페이지 안내" icon="📦" descriptions={orderDescriptions} />
            </div>

            <UserOrderTable orders={orders} />
        </div>
    )
}
