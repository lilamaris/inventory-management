import {
    LucideIcon,
    Home,
    Package,
    Layers,
    History,
    PackagePlus,
    User,
    Truck,
    BarChart,
    AlertCircle,
    Archive,
    FileText,
    CornerUpLeft,
    Send,
    ClipboardList,
    UserCheck,
    TrendingUp,
    BarChart2,
    Bell,
    Zap,
    Settings,
    BookOpen,
    HelpCircle,
    Mail,
} from 'lucide-react'
import { buildRouteTree } from '@/lib/utils'

export interface AppMeta {
    versionRoutePrefix: string
    version: string
    name: string
    description: string
}

export const appMeta: AppMeta = {
    versionRoutePrefix: '/v0',
    version: '0.0.1',
    name: 'Inventory Inc.',
    description: 'Inventory Inc. is a simple inventory management system.',
}

export interface RouteMeta {
    label: string
    icon?: LucideIcon
}

export interface RouteNode extends RouteMeta {
    id: string
    href?: string
    subRoutes?: [RouteNode, ...RouteNode[]]
}

const availableRoutes: Record<string, RouteNode> = {
    DASHBOARD: { id: 'dashboard', label: 'Dashboard', icon: Home },
    PRODUCT: { id: 'product', label: 'Product', icon: Package },
    CATEGORY: { id: 'category', label: 'Category', icon: Layers },
    STOCK_LEVEL: { id: 'stock-level', label: 'Stock Level', icon: BarChart },
    LOW_STOCK: { id: 'low-stock', label: 'Low Stock', icon: AlertCircle },
    PURCHASE_ORDER: { id: 'purchase-order', label: 'Purchase Order', icon: FileText },
    SALES_ORDER: { id: 'sales-order', label: 'Sales Order', icon: ClipboardList },
    SUPPLIER: { id: 'supplier', label: 'Supplier', icon: Truck },
    SEND_SHIPMENT: { id: 'send-shipment', label: 'Send Shipment', icon: Send },
    RECEIVE_SHIPMENT: { id: 'receive-shipment', label: 'Receive Shipment', icon: Archive },
    RETURN_SHIPMENT: { id: 'return-shipment', label: 'Return Shipment', icon: CornerUpLeft },
    CUSTOMER: { id: 'customer', label: 'Customer', icon: User },
    EMPLOYEE: { id: 'employee', label: 'Employee', icon: UserCheck },
    STOCK_MOVEMENT: { id: 'stock-movement', label: 'Stock Movement', icon: TrendingUp },
    SALES_REPORT: { id: 'sales-report', label: 'Sales Report', icon: BarChart2 },
    PURCHASE_REPORT: { id: 'purchase-report', label: 'Purchase Report', icon: BarChart },
    NOTIFICATION: { id: 'notification', label: 'Notification', icon: Bell },
    INTEGRATION: { id: 'integration', label: 'Integration', icon: Zap },
    SETTING: { id: 'setting', label: 'Settings', icon: Settings },
    DOCUMENTATION: { id: 'documentation', label: 'Documentation', icon: BookOpen },
    FAQ: { id: 'faq', label: 'FAQ', icon: HelpCircle },
    CONTACT: { id: 'contact', label: 'Contact', icon: Mail },
}

const routeHierarchy: Record<string, RouteNode> = {
    overview: {
        id: 'overview',
        label: 'Overview',
        icon: BarChart2,
        subRoutes: [
            availableRoutes.DASHBOARD,
            availableRoutes.STOCK_MOVEMENT,
            availableRoutes.SALES_REPORT,
            availableRoutes.PURCHASE_REPORT,
        ],
    },
    inventory: {
        id: 'inventory',
        label: 'Inventory',
        icon: Package,
        subRoutes: [
            availableRoutes.PRODUCT,
            availableRoutes.CATEGORY,
            availableRoutes.STOCK_LEVEL,
            availableRoutes.LOW_STOCK,
        ],
    },
    purchase: {
        id: 'purchase',
        label: 'Purchase',
        icon: PackagePlus,
        subRoutes: [availableRoutes.PURCHASE_ORDER, availableRoutes.RECEIVE_SHIPMENT, availableRoutes.SUPPLIER],
    },
    order: {
        id: 'order',
        label: 'Order',
        icon: ClipboardList,
        subRoutes: [availableRoutes.SALES_ORDER, availableRoutes.SEND_SHIPMENT, availableRoutes.RETURN_SHIPMENT],
    },
    people: {
        id: 'people',
        label: 'People',
        icon: User,
        subRoutes: [availableRoutes.CUSTOMER, availableRoutes.EMPLOYEE],
    },
    settings: {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        subRoutes: [availableRoutes.NOTIFICATION, availableRoutes.INTEGRATION, availableRoutes.SETTING],
    },
    help: {
        id: 'help',
        label: 'Help & Support',
        icon: HelpCircle,
        subRoutes: [availableRoutes.DOCUMENTATION, availableRoutes.FAQ, availableRoutes.CONTACT],
    },
}

export const routeTree = buildRouteTree(routeHierarchy, appMeta.versionRoutePrefix)
