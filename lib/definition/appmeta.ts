import { LucideIcon, Home, Package, Layers, History, PackagePlus, User, Truck } from 'lucide-react'
import 'server-only'

export interface AppMeta {
    versionRoutePrefix: string
    version: string
    name: string
    description: string
}

export const appMeta: AppMeta = {
    versionRoutePrefix: 'v0',
    version: '0.0.1',
    name: 'Inventory Inc.',
    description: 'Inventory Inc. is a simple inventory management system.',
}

export interface RouteMeta {
    id: string
    label: string
    icon?: LucideIcon
}

export const routeMeta: Record<string, RouteMeta> = {
    DASHBOARD: { id: 'dashboard', label: 'Dashboard', icon: Home },
    PRODUCTS: { id: 'products', label: 'Products', icon: Package },
    CATEGORIES: { id: 'categories', label: 'Categories', icon: Layers },
    TRANSACTIONS: { id: 'transactions', label: 'Transactions', icon: History },
    PURCHASES: { id: 'purchases', label: 'Purchases', icon: PackagePlus },
    SUPPLIERS: { id: 'suppliers', label: 'Suppliers', icon: Truck },
    EMPLOYEES: { id: 'employees', label: 'Employees', icon: User },
    CUSTOMERS: { id: 'customers', label: 'Customers', icon: User },
}

export const navigationMap: (RouteMeta & { subRoutes?: RouteMeta[] })[] = [
    routeMeta.DASHBOARD,
    {
        id: 'inventory',
        label: 'Inventory',
        subRoutes: [routeMeta.PRODUCTS, routeMeta.CATEGORIES],
    },
    {
        id: 'order',
        label: 'Order',
        subRoutes: [routeMeta.TRANSACTIONS, routeMeta.PURCHASES, routeMeta.SUPPLIERS],
    },
    {
        id: 'human-resource',
        label: 'Human Resource',
        subRoutes: [routeMeta.EMPLOYEES, routeMeta.CUSTOMERS],
    },
]
