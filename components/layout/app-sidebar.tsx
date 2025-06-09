import * as React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { GalleryVerticalEnd, LogOut } from 'lucide-react'
import { auth } from '@/lib/auth'
import { RouteMeta } from '@/lib/definition/appmeta'

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    navigations: RouteMeta[]
}

const renderSingleItem = (route: RouteMeta, depth: number) => {
    return (
        <SidebarMenuItem key={route.label}>
            <SidebarMenuButton asChild>
                <Link href={route.id} style={depth > 0 ? { paddingLeft: `${depth * 12}px` } : {}}>
                    {route.icon && React.createElement(route.icon, { className: 'size-4' })}
                    {route.label}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
const renderSidebarGroup = (route: RouteMeta & { subRoutes?: RouteMeta[] }, depth = 0) => {
    const { id, label, subRoutes = [] } = route

    const subRoutesHrefMutated = subRoutes.map((subRoute) => ({ ...subRoute, id: `${id}/${subRoute.id}` }))

    if (!subRoutes || subRoutes.length === 0) {
        return depth === 0 ? (
            <SidebarGroup key={id}>
                <SidebarMenu>{renderSingleItem(route, depth)}</SidebarMenu>
            </SidebarGroup>
        ) : (
            renderSingleItem(route, depth)
        )
    }

    return (
        <SidebarGroup key={id}>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {subRoutesHrefMutated.map((subRoute) => renderSidebarGroup(subRoute, depth + 1))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export async function AppSidebar({ navigations = [], ...props }: AppSidebarProps) {
    const session = await auth()

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center rounded-lg size-8 justify-center">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Inventory Management</span>
                                    <span className="text-muted-foreground">by Lilamaris</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>{navigations.map((navigation) => renderSidebarGroup(navigation))}</SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/auth/profile">
                                <img src={session?.user?.image || '#'} alt="Profile" className="size-8 rounded-full" />
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">{session?.user?.name}</span>
                                    <span className="text-muted-foreground">{session?.user?.email}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/auth/signout">
                                <LogOut className="size-4" />
                                Logout
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
