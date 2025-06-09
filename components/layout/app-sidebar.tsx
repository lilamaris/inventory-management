import * as React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { ChevronRight, GalleryVerticalEnd, LogOut, Minus, Plus } from 'lucide-react'
import { auth } from '@/lib/auth'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { cn } from '@/lib/utils'

import { routeTree, RouteNode } from '@/lib/definition/appmeta'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

function renderCollapsibleRoute(route: RouteNode) {
    if (route.subRoutes) {
        return (
            <SidebarMenu key={route.id}>
                <Collapsible className="group/collapsible" defaultOpen={true}>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                {route.icon && React.createElement(route.icon, { className: 'size-4' })}
                                {route.label}
                                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent
                            className={cn(
                                'text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                            )}
                        >
                            <SidebarMenuSub>
                                {route.subRoutes.map((subRoute) => (
                                    <SidebarMenuItem key={subRoute.id}>
                                        {renderCollapsibleRoute(subRoute)}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        )
    }
    return (
        <SidebarMenuButton asChild>
            <Link href={route.href ?? '#'}>
                {route.icon && React.createElement(route.icon, { className: 'size-4' })}
                {route.label}
            </Link>
        </SidebarMenuButton>
    )
}

function renderDropdownRoute(route: RouteNode) {
    if (route.subRoutes) {
        return (
            <SidebarMenu key={route.id}>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="group/dropdown-menu group-data-[state=open]/dropdown-menu:hidden"
                        asChild
                    >
                        <SidebarMenuItem>
                            <SidebarMenuButton className="group-data-[state=open]/dropdown-menu:bg-sidebar-accent">
                                {route.icon && React.createElement(route.icon, { className: 'size-4' })}
                                {route.label}
                                <ChevronRight className="ml-auto group-data-[state=open]/dropdown-menu:rotate-180 transition-transform" />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="end">
                        {route.subRoutes?.map((subRoute) => (
                            <DropdownMenuItem key={subRoute.id}>
                                <Link href={subRoute.href ?? '#'}>{subRoute.label}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenu>
        )
    }

    return (
        <SidebarMenuButton asChild>
            <Link href={route.href ?? '#'}>
                {route.icon && React.createElement(route.icon, { className: 'size-4' })}
                {route.label}
            </Link>
        </SidebarMenuButton>
    )
}

function renderMainRouteTree(routeTree: RouteNode[]) {
    return (
        <SidebarGroup>
            <SidebarGroupContent>{routeTree.map((route) => renderCollapsibleRoute(route))}</SidebarGroupContent>
        </SidebarGroup>
    )
}

function renderSecondaryRouteTree(routeTree: RouteNode[]) {
    return (
        <SidebarGroup className="mt-auto">
            <SidebarGroupContent>{routeTree.map((route) => renderDropdownRoute(route))}</SidebarGroupContent>
        </SidebarGroup>
    )
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const session = await auth()

    const navMain = routeTree.filter((tree) => !['settings', 'help'].includes(tree.id))
    const navSettings = routeTree.filter((tree) => ['settings', 'help'].includes(tree.id))

    return (
        <Sidebar className={cn(props.className, 'select-none')} {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center rounded-lg size-8 justify-center">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-1 flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Inventory Management</span>
                                    <span className="text-muted-foreground">by Lilamaris</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {renderMainRouteTree(navMain)}
                {renderSecondaryRouteTree(navSettings)}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/auth/profile">
                                <img
                                    src={session?.user?.image || '#'}
                                    alt="Profile"
                                    className="bg-white size-8 rounded-full"
                                />
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">{session?.user?.name}</span>
                                    <span className="text-muted-foreground">{session?.user?.email}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
