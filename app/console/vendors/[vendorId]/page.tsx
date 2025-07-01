import { notFound, redirect } from 'next/navigation'
import { getCurrentSession } from '@/lib/server/session'

import { getVendor } from '@/features/composite/vendor.service'
import VendorAvatar from '@/features/vendor/components/vendor-avatar'
import ItemTable from '@/features/item/components/item-table'
import InfoSection from '@/components/layout/info-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Separator from '@/components/ui/separator'

export interface VendorPageProps {
    params: { vendorId: string }
}

export default async function VendorPage({ params }: VendorPageProps) {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const { vendorId } = await params
    const vendor = await getVendor(vendorId)

    if (!vendor) {
        notFound()
    }

    const vendorDescriptions = [
        '이 페이지에서는 선택한 판매자의 상세 정보를 확인할 수 있습니다.',
        '판매자 정보 섹션에서는 판매자명, 설명, 등록일 등의 기본 정보를 확인할 수 있습니다.',
        '카테고리 섹션에서는 해당 판매자가 취급하는 상품 카테고리를 확인할 수 있습니다.',
        '판매 상품 섹션에서는 해당 판매자가 판매하는 모든 상품 목록을 테이블 형태로 확인할 수 있습니다.',
        '상품 테이블에서는 상품명, SKU, 가격, 재고 등의 정보를 확인할 수 있습니다.',
        'Actions 버튼을 통해 상품 상세보기, 편집 등의 기능을 사용할 수 있습니다.',
    ]

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <InfoSection title="페이지 안내" icon="🏪" descriptions={vendorDescriptions} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle> 
                            <VendorAvatar vendor={vendor} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">설명</h3>
                            <p className="text-sm mt-1">{vendor.description || '설명이 없습니다.'}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">등록일</h3>
                            <p className="text-sm mt-1">{vendor.createdAt.toLocaleDateString('ko-KR')}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">관리자 수</h3>
                            <p className="text-sm mt-1">{vendor.managers.length}명</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>취급 카테고리</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {vendor.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {vendor.categories.map((category) => (
                                    <Badge key={category.id} variant="secondary">
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">등록된 카테고리가 없습니다.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>판매 상품</CardTitle>
                </CardHeader>
                <CardContent>
                    {vendor.items.length > 0 ? (
                        <ItemTable items={vendor.items} />
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">등록된 상품이 없습니다.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
