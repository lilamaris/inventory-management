import { getVendors } from '@/features/composite/vendor.service'
import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'

import VendorTable from '@/features/vendor/components/vendor-table'
import InfoSection from '@/components/ui/info-section'

export default async function VendorsPage() {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const vendors = await getVendors()

    const vendorDescriptions = [
        '이 테이블은 현재 등록된 모든 판매자들의 정보를 보여줍니다.',
        '**Vendor** 열에는 판매자명과 기본 정보가 표시됩니다.',
        '**Categories** 열에서는 해당 판매자가 취급하는 상품 카테고리를 확인할 수 있습니다.',
        '**Items** 열에서는 판매자가 보유한 상품 수를 확인할 수 있습니다.',
        '**Actions** 버튼을 클릭하면 해당 판매자의 상세 정보 확인, 상품 보기, 즐겨찾기 추가 등의 기능을 사용할 수 있습니다.',
        '체크박스를 통해 여러 판매자를 선택하여 일괄 작업을 수행할 수 있습니다.',
    ]

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">판매자 목록</h1>
                <InfoSection title="페이지 안내" descriptions={vendorDescriptions} />
            </div>

            <VendorTable vendors={vendors} />
        </div>
    )
}
