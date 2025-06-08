import { AppSidebar, SidebarGroupItem } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import {
    ChartLine,
    Layers,
    Package,
    PackageCheck,
    PackagePlus,
    Shield,
    ShoppingBag,
    ShoppingCart,
    Users,
} from 'lucide-react'

const groups: SidebarGroupItem[] = [
    {
        label: 'Dashboard',
        subGroups: [
            {
                label: 'Overview',
                href: '/dashboard/overview',
                icon: <ChartLine />,
            },
        ],
    },
    {
        label: 'Inventory',
        subGroups: [
            {
                label: 'Products',
                href: '/inventory/products',
                icon: <Package />,
            },
            {
                label: 'Categories',
                href: '/inventory/categories',
                icon: <Layers />,
            },
        ],
    },
    {
        label: 'Stock',
        subGroups: [
            {
                label: 'Orders',
                href: '/stock/orders',
                icon: <ShoppingBag />,
            },
            {
                label: 'Transactions',
                href: '/stock/transactions',
                icon: <ShoppingCart />,
            },
            {
                label: 'Purchases',
                href: '/stocks/purchases',
                icon: <PackagePlus />,
            },
            {
                label: 'Suppliers',
                href: '/stocks/suppliers',
                icon: <PackageCheck />,
            },
        ],
    },
    {
        label: 'Human Resource',
        subGroups: [
            {
                label: 'Employees',
                href: '/hr/employees',
                icon: <Users />,
            },
        ],
    },
    {
        label: 'Admin Area',
        icon: <Shield />,
        subGroups: [
            {
                label: 'Users',
                href: '/hr/admin-area/user-management',
                icon: <Users />,
            },
            {
                label: 'Access Control',
                href: '/hr/admin-area/access-control',
                icon: <Shield />,
            },
        ],
    },
]

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar groups={groups} variant="floating" />
            <SidebarInset>
                <main className="p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout
