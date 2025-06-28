import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    Store,
    Users,
    ShoppingCart,
    Zap,
    ArrowRight,
    BookOpen,
    Play,
    Target,
    TrendingUp,
    Settings,
    Package,
    FileText,
    HelpCircle,
} from 'lucide-react'

import { getCurrentSession } from '@/lib/server/session'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default async function Page() {
    const { session, user } = await getCurrentSession()

    if (session === null) redirect('/auth/login')

    return (
        <div className="min-h-screen">
            {/* Welcome Header */}
            <section className="border-b">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">환영합니다, {user?.name ?? '사용자'}님! 👋</h1>
                        <p className="text-lg text-muted-foreground mb-6">
                            Inventory Management 시뮬레이션에 오신 것을 환영합니다. 아래 가이드를 통해 애플리케이션의
                            모든 기능을 활용해보세요.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Badge variant="secondary" className="text-sm">
                                <BookOpen className="w-3 h-3 mr-1" />
                                학습 목적
                            </Badge>
                            <Badge variant="secondary" className="text-sm">
                                <Play className="w-3 h-3 mr-1" />
                                실시간 시뮬레이션
                            </Badge>
                            <Badge variant="secondary" className="text-sm">
                                <Target className="w-3 h-3 mr-1" />
                                비즈니스 역량 개발
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start Guide */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">빠른 시작 가이드</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            처음 사용하시는 분들을 위한 단계별 가이드입니다. 순서대로 따라하시면 애플리케이션의 모든
                            기능을 쉽게 익힐 수 있습니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">1</span>
                                </div>
                                <CardTitle className="text-lg">Vendor 생성</CardTitle>
                                <CardDescription>나만의 판매점을 만들어보세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/console/vendors">
                                    <Button size="sm" className="w-full">
                                        Vendor 관리
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-green-600">2</span>
                                </div>
                                <CardTitle className="text-lg">상품 등록</CardTitle>
                                <CardDescription>판매할 상품들을 등록하세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/console/my-vendor/items">
                                    <Button size="sm" className="w-full">
                                        상품 관리
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-purple-600">3</span>
                                </div>
                                <CardTitle className="text-lg">Manager 초대</CardTitle>
                                <CardDescription>팀원을 초대하여 함께 운영하세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/console/my-vendor/managers">
                                    <Button size="sm" className="w-full">
                                        Manager 관리
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-orange-600">4</span>
                                </div>
                                <CardTitle className="text-lg">주문 처리</CardTitle>
                                <CardDescription>들어온 주문을 처리하고 관리하세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/console/my-vendor/orders">
                                    <Button size="sm" className="w-full">
                                        주문 관리
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Detailed Features */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">주요 기능 상세 가이드</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            각 기능의 상세한 사용법과 활용 팁을 확인해보세요.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Vendor Management */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Store className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <CardTitle>Vendor 관리</CardTitle>
                                        <CardDescription>나만의 판매점 운영하기</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">주요 기능:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• Vendor 프로필 설정 및 관리</li>
                                        <li>• 판매점 정보 및 설명 등록</li>
                                        <li>• 운영 시간 및 정책 설정</li>
                                        <li>• 판매 통계 및 성과 분석</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">사용 팁:</h4>
                                    <p className="text-sm">
                                        매력적인 Vendor 프로필을 만들어 고객들의 관심을 끌어보세요. 명확한 설명과
                                        정책으로 신뢰도를 높일 수 있습니다.
                                    </p>
                                </div>
                                <Link href="/console/vendors">
                                    <Button size="sm" variant="outline" className="w-full">
                                        Vendor 관리 시작하기
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Item Management */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <CardTitle>상품 관리</CardTitle>
                                        <CardDescription>판매 상품 등록 및 관리</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">주요 기능:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• 상품 정보 등록 및 수정</li>
                                        <li>• 재고 수량 관리</li>
                                        <li>• 가격 설정 및 할인 정책</li>
                                        <li>• 카테고리별 분류</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">사용 팁:</h4>
                                    <p className="text-sm">
                                        상품 사진과 상세한 설명을 추가하여 고객들이 쉽게 이해할 수 있도록 하세요. 적절한
                                        가격 설정이 판매 성과에 큰 영향을 미칩니다.
                                    </p>
                                </div>
                                <Link href="/console/my-vendor/items">
                                    <Button size="sm" variant="outline" className="w-full">
                                        상품 관리 시작하기
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Manager Management */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <CardTitle>Manager 관리</CardTitle>
                                        <CardDescription>팀원 초대 및 권한 관리</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">주요 기능:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• Manager 초대 및 등록</li>
                                        <li>• 권한 레벨 설정</li>
                                        <li>• 업무 분담 및 역할 정의</li>
                                        <li>• 팀 성과 모니터링</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">사용 팁:</h4>
                                    <p className="text-sm">
                                        각 Manager의 강점에 맞는 역할을 부여하세요. 명확한 권한 설정으로 효율적인 업무
                                        분담이 가능합니다.
                                    </p>
                                </div>
                                <Link href="/console/my-vendor/managers">
                                    <Button size="sm" variant="outline" className="w-full">
                                        Manager 관리 시작하기
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Order Processing */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <ShoppingCart className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <CardTitle>주문 처리</CardTitle>
                                        <CardDescription>고객 주문 관리 및 처리</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">주요 기능:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• 실시간 주문 알림</li>
                                        <li>• 주문 상태 업데이트</li>
                                        <li>• 배송 및 완료 처리</li>
                                        <li>• 주문 이력 관리</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">사용 팁:</h4>
                                    <p className="text-sm">
                                        빠른 주문 처리가 고객 만족도를 높입니다. 주문 상태를 정기적으로 업데이트하여
                                        고객에게 신뢰감을 제공하세요.
                                    </p>
                                </div>
                                <Link href="/console/my-vendor/orders">
                                    <Button size="sm" variant="outline" className="w-full">
                                        주문 관리 시작하기
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Shopping Experience */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">구매자 경험</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            다른 Vendor들의 상품을 둘러보고 구매해보세요. 실제 쇼핑몰처럼 다양한 상품을 탐색하고 주문할
                            수 있습니다.
                        </p>
                    </div>

                    <Card className="max-w-4xl mx-auto">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-red-600" />
                            </div>
                            <CardTitle className="text-xl">쇼핑 경험</CardTitle>
                            <CardDescription>다양한 Vendor의 상품을 둘러보고 구매하세요</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <Store className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Vendor 탐색</h4>
                                    <p className="text-sm">
                                        다양한 Vendor들의 상품을 둘러보고 관심 있는 상품을 찾아보세요.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <ShoppingCart className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold mb-2">주문 생성</h4>
                                    <p className="text-sm">
                                        원하는 상품을 선택하고 간편하게 주문을 생성할 수 있습니다.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <TrendingUp className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold mb-2">주문 추적</h4>
                                    <p className="text-sm">주문한 상품의 처리 상태를 실시간으로 확인할 수 있습니다.</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <Link href="/console/order">
                                    <Button size="lg">
                                        쇼핑 시작하기
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Help & Support */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">도움말 및 지원</h2>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            사용 중 궁금한 점이나 문제가 있으시면 언제든지 문의해주세요.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <HelpCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle>자주 묻는 질문</CardTitle>
                                <CardDescription>사용자들이 자주 묻는 질문들을 확인해보세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" variant="outline" className="w-full">
                                    FAQ 보기
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle>사용자 가이드</CardTitle>
                                <CardDescription>상세한 사용법과 기능 설명을 확인하세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" variant="outline" className="w-full">
                                    가이드 보기
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Settings className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle>기술 지원</CardTitle>
                                <CardDescription>기술적인 문제나 버그를 신고하세요</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" variant="outline" className="w-full">
                                    지원 요청
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}
