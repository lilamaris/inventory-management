import { LucideIcon, Clipboard, Store, Users, Shield, CreditCard, History, Truck } from 'lucide-react'

export interface RouteMeta {
    label: string
    icon?: LucideIcon
}

export interface RouteNode extends RouteMeta {
    id: string
    href?: string
    subRoutes?: RouteNode[]
}

export const routeTree: Record<string, RouteNode> = {
    vendors: {
        id: 'vendors',
        label: '판매자',
        icon: Store,
        href: '/vendors',
    },
    order: {
        id: 'order',
        label: '주문',
        icon: Clipboard,
        href: '/order',
    },
    myVendor: {
        id: 'my-vendor',
        label: '내 판매점',
        icon: Shield,
        subRoutes: [
            {
                id: 'orders',
                label: '주문 관리',
                icon: Clipboard,
                href: '/my-vendor/orders',
            },
            {
                id: 'items',
                label: '상품 관리',
                icon: Store,
                href: '/my-vendor/items',
            },
            {
                id: 'managers',
                label: '직원 관리',
                icon: Users,
                href: '/my-vendor/managers',
            },
            {
                id: 'fulfillment',
                label: '주문 처리 현황',
                icon: Truck,
                href: '/my-vendor/fulfillment',
            },
        ],
    },
}
