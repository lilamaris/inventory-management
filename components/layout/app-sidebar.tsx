import * as React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarItem,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { GalleryVerticalEnd, LogOut } from 'lucide-react'
import { auth } from '@/lib/auth'

export interface SidebarGroupItem {
    label: string
    href?: string
    icon?: React.ReactNode
    subGroups?: SidebarGroupItem[]
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    groups: SidebarGroupItem[]
}

const renderSidebarGroup = ({ label, icon, href, subGroups }: SidebarGroupItem, depth = 0) => {
    return subGroups && subGroups.length > 0 ? (
        <SidebarGroup key={label}>
            {href ? (
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href={href || ''}>
                                {icon}
                                {label}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            ) : (
                <SidebarGroupLabel>{label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
                <SidebarMenu>{subGroups.map((groups) => renderSidebarGroup(groups, depth + 1))}</SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    ) : (
        <SidebarMenuItem key={label}>
            <SidebarMenuButton asChild>
                <Link href={href || ''} style={{ paddingLeft: `${depth * 12}px` }}>
                    {icon}
                    {label}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export const AppSidebar = async ({ groups = [], ...props }: AppSidebarProps) => {
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
            <SidebarContent>{groups.map((group) => renderSidebarGroup(group))}</SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/auth/profile">
                                <img src={session?.user?.image || ''} alt="Profile" className="size-8 rounded-full" />
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
