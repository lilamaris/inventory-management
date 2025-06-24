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
        label: 'Vendors',
        icon: Store,
        href: '/vendors',
    },
    order: {
        id: 'order',
        label: 'Order',
        icon: Clipboard,
        href: '/order',
    },
    myVendor: {
        id: 'myVendor',
        label: 'My Vendor',
        icon: Shield,
        subRoutes: [
            {
                id: 'orders',
                label: 'Orders',
                icon: Clipboard,
                href: '/my-vendor/orders',
            },
            {
                id: 'items',
                label: 'Items',
                icon: Store,
                href: '/my-vendor/items',
            },
            {
                id: 'managers',
                label: 'Managers',
                icon: Users,
                href: '/my-vendor/managers',
            },
            {
                id: 'fulfillment',
                label: 'Fulfillment',
                icon: Truck,
                href: '/my-vendor/fulfillment',
            },
        ],
    },
}
