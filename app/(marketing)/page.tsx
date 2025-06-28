import Link from 'next/link'
import {
    ArrowRight,
    ShoppingCart,
    Store,
    Users,
    BarChart3,
    Shield,
    Zap,
    Mail,
    Github,
    Info,
    AlertTriangle,
} from 'lucide-react'

import { getCurrentSession } from '@/lib/server/session'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Separator from '@/components/ui/separator'

export default async function Page() {
    const { session } = await getCurrentSession()

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-5xl py-4 md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                            Inventory Management
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            실시간 구매·판매 시뮬레이션으로 비즈니스 역량을 키우세요
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {session ? (
                                <Link href="/console">
                                    <Button size="lg" className="text-lg px-8 py-6">
                                        대시보드로 이동
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/login">
                                        <Button size="lg" className="text-lg px-8 py-6">
                                            로그인
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/auth/signup">
                                        <Button size="lg" className="text-lg px-8 py-6">
                                            회원가입
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">완벽한 비즈니스 시뮬레이션</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            판매자와 구매자 역할을 경험하며 실제 비즈니스 환경에서 필요한 모든 역량을 키워보세요
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Vendor Management */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                    <Store className="h-8 w-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl">Vendor 관리</CardTitle>
                                <CardDescription>나만의 판매점을 운영하고 상품을 관리하세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    상품 등록 및 재고 관리
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    가격 설정 및 카테고리 분류
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    판매 통계 및 분석
                                </div>
                            </CardContent>
                        </Card>

                        {/* Manager Management */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                                    <Users className="h-8 w-8 text-green-600" />
                                </div>
                                <CardTitle className="text-xl">Manager 관리</CardTitle>
                                <CardDescription>팀원을 관리하고 업무를 효율적으로 분배하세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    Manager 초대 및 권한 설정
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    업무 분담 및 역할 정의
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />팀 성과 모니터링
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Processing */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                                    <ShoppingCart className="h-8 w-8 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl">주문 처리</CardTitle>
                                <CardDescription>들어온 주문을 효율적으로 처리하고 관리하세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                                    실시간 주문 알림
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                                    주문 상태 업데이트
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                                    배송 및 완료 처리
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transaction History */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                                    <BarChart3 className="h-8 w-8 text-orange-600" />
                                </div>
                                <CardTitle className="text-xl">거래 이력</CardTitle>
                                <CardDescription>모든 거래 내역을 추적하고 분석하세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                    상세한 거래 로그
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                    Manager별 처리 기록
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                    성과 분석 및 리포트
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shopping Experience */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                                    <Zap className="h-8 w-8 text-red-600" />
                                </div>
                                <CardTitle className="text-xl">쇼핑 경험</CardTitle>
                                <CardDescription>다양한 Vendor의 상품을 둘러보고 구매하세요</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    Vendor별 상품 탐색
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    간편한 주문 생성
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    실시간 주문 추적
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security & Reliability */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                                    <Shield className="h-8 w-8 text-indigo-600" />
                                </div>
                                <CardTitle className="text-xl">보안 & 안정성</CardTitle>
                                <CardDescription>안전하고 신뢰할 수 있는 플랫폼을 제공합니다</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                                    실시간 데이터 백업
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                                    권한 기반 접근 제어
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                                    99.9% 가동률 보장
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        실제 비즈니스 환경을 시뮬레이션하며 귀중한 경험을 쌓아보세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {session ? (
                            <Link href="/console">
                                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                                    대시보드로 이동
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/auth/signup">
                                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                                        무료로 시작하기
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/auth/login">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600"
                                    >
                                        로그인
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* About Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">Inventory Management</h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                이 애플리케이션은 교육 및 학습 목적으로 개발된 구매·판매 시뮬레이션 플랫폼입니다. 실제
                                비즈니스 환경을 모방하여 사용자들이 비즈니스 프로세스, 재고 관리, 팀 협업, 고객 서비스
                                등의 역량을 실습할 수 있도록 설계되었습니다.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="mailto:support@inventory-management.com"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>Contact</span>
                                </Link>
                                <Link
                                    href="https://github.com/inventory-management"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <Github className="h-4 w-4" />
                                    <span>GitHub</span>
                                </Link>
                            </div>
                        </div>

                        {/* Important Notice */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                중요 안내사항
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>이 플랫폼은 교육 목적의 시뮬레이션입니다</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>실제 금전 거래는 발생하지 않습니다</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>모든 데이터는 학습 목적으로만 사용됩니다</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                                    <span>상업적 목적으로 사용하지 마세요</span>
                                </li>
                            </ul>
                        </div>

                        {/* Features Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Info className="h-5 w-5 text-blue-400" />
                                주요 기능
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li>
                                    <Link href="#vendor-management" className="hover:text-white transition-colors">
                                        Vendor 관리
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#manager-management" className="hover:text-white transition-colors">
                                        Manager 관리
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#order-processing" className="hover:text-white transition-colors">
                                        주문 처리
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#transaction-history" className="hover:text-white transition-colors">
                                        거래 이력
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#shopping-experience" className="hover:text-white transition-colors">
                                        쇼핑 경험
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Separator className="my-8 bg-gray-700" />

                    {/* Copyright & Legal */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <div className="text-center md:text-left">
                            <p>&copy; 2024 Inventory Management. All rights reserved.</p>
                            <p className="mt-1">이 애플리케이션은 교육 및 학습 목적으로만 제공됩니다.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 text-center">
                            <Link href="/terms" className="hover:text-white transition-colors">
                                이용약관
                            </Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                개인정보처리방침
                            </Link>
                            <Link href="/disclaimer" className="hover:text-white transition-colors">
                                면책조항
                            </Link>
                        </div>
                    </div>

                    {/* Additional Legal Notice */}
                    <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                        <h5 className="font-semibold text-yellow-400 mb-2">법적 고지사항</h5>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            본 애플리케이션은 실제 비즈니스 운영을 위한 것이 아닌 교육 및 학습 목적으로 개발되었습니다.
                            여기서 제공되는 모든 기능, 데이터, 시뮬레이션은 실제 비즈니스 환경을 모방한 것이지만, 실제
                            금전적 가치나 법적 구속력을 가지지 않습니다. 사용자는 이 플랫폼을 통해 얻은 경험과 지식을
                            실제 비즈니스에 적용할 때 적절한 전문가의 조언을 구하는 것을 권장합니다.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
