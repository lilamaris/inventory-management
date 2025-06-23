import { LucideIcon, XCircle, CircleCheck, CirclePause, CircleEllipsis, Clipboard, Store } from 'lucide-react'

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
        subRoutes: [
            {
                id: 'pending',
                label: 'Pending',
                icon: CirclePause,
                href: '/order/pending',
            },
            {
                id: 'approved',
                label: 'Approved',
                icon: CircleEllipsis,
                href: '/order/approved',
            },
            {
                id: 'rejected',
                label: 'Rejected',
                icon: XCircle,
                href: '/order/rejected',
            },
            {
                id: 'delivered',
                label: 'Delivered',
                icon: CircleCheck,
                href: '/order/delivered',
            },
        ],
    },
}
