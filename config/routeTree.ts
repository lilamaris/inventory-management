import {
    LucideIcon,
    Home,
    Package,
    Layers,
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
    PURCHASE_REPORT: { id: 'purchase-report', label: 'Purchase Report', icon: BarChart2 },
    NOTIFICATION: { id: 'notification', label: 'Notification', icon: Bell },
    INTEGRATION: { id: 'integration', label: 'Integration', icon: Zap },
    DOCUMENTATION: { id: 'documentation', label: 'Documentation', icon: BookOpen },
    FAQ: { id: 'faq', label: 'FAQ', icon: HelpCircle },
    CONTACT: { id: 'contact', label: 'Contact', icon: Mail },
}

export const routeTree: Record<string, RouteNode> = {
    overview: {
        id: 'overview',
        label: 'Overview',
        icon: BarChart2,
        subRoutes: [
            { ...availableRoutes.DASHBOARD, href: '/overview/dashboard' },
            { ...availableRoutes.STOCK_MOVEMENT, href: '/overview/stock-movement' },
            { ...availableRoutes.SALES_REPORT, href: '/overview/sales-report' },
            { ...availableRoutes.PURCHASE_REPORT, href: '/overview/purchase-report' },
        ],
    },
    inventory: {
        id: 'inventory',
        label: 'Inventory',
        icon: Package,
        subRoutes: [
            { ...availableRoutes.PRODUCT, href: '/inventory/product' },
            { ...availableRoutes.CATEGORY, href: '/inventory/category' },
            { ...availableRoutes.STOCK_LEVEL, href: '/inventory/stock-level' },
            { ...availableRoutes.LOW_STOCK, href: '/inventory/low-stock' },
        ],
    },
    purchase: {
        id: 'purchase',
        label: 'Purchase',
        icon: PackagePlus,
        subRoutes: [
            { ...availableRoutes.PURCHASE_ORDER, href: '/purchase/purchase-order' },
            { ...availableRoutes.RECEIVE_SHIPMENT, href: '/purchase/receive-shipment' },
            { ...availableRoutes.SUPPLIER, href: '/purchase/supplier' },
        ],
    },
    order: {
        id: 'order',
        label: 'Order',
        icon: ClipboardList,
        subRoutes: [
            { ...availableRoutes.SALES_ORDER, href: '/order/sales-order' },
            { ...availableRoutes.SEND_SHIPMENT, href: '/order/send-shipment' },
            { ...availableRoutes.RETURN_SHIPMENT, href: '/order/return-shipment' },
        ],
    },
    people: {
        id: 'people',
        label: 'People',
        icon: User,
        subRoutes: [
            { ...availableRoutes.CUSTOMER, href: '/people/customer' },
            { ...availableRoutes.EMPLOYEE, href: '/people/employee' },
        ],
    },
    settings: {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        subRoutes: [
            { ...availableRoutes.NOTIFICATION, href: '/settings/notification' },
            { ...availableRoutes.INTEGRATION, href: '/settings/integration' },
        ],
    },
    help: {
        id: 'help',
        label: 'Help & Support',
        icon: HelpCircle,
        subRoutes: [
            { ...availableRoutes.DOCUMENTATION, href: '/help/documentation' },
            { ...availableRoutes.FAQ, href: '/help/faq' },
            { ...availableRoutes.CONTACT, href: '/help/contact' },
        ],
    },
}
