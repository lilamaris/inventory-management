'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useBreadcrumbs } from '@/hooks/use-breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, SlashIcon } from 'lucide-react'
import type { RouteNode } from '@/config/routeTree'
import { Fragment } from 'react'
import { appMeta } from '@/config/app'
import { Button } from '@/components/ui/button'

function subrouteBreadcrumb(breadcrumb: RouteNode) {
    return (
        <DropdownMenu>
            <Button variant="ghost" size="sm" asChild>
                <DropdownMenuTrigger className="group/dropdown-menu">
                    {breadcrumb.label}
                    <ChevronDown className="size-4 transition-transform group-data-[state=open]/dropdown-menu:rotate-180" />
                </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent className="bg-background" align="start">
                {breadcrumb.subRoutes?.map((subRoute) => (
                    <DropdownMenuItem key={subRoute.id} asChild>
                        <BreadcrumbLink href={`${appMeta.versionRoutePrefix}${subRoute.href}`}>
                            {subRoute.icon && <subRoute.icon className="size-4" />}
                            {subRoute.label}
                        </BreadcrumbLink>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function renderBreadcrumb(breadcrumb: RouteNode, isLast: boolean) {
    if (breadcrumb.subRoutes) {
        return subrouteBreadcrumb(breadcrumb)
    }

    return isLast ? (
        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
    ) : (
        <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
    )
}

export default function HeaderBreadcrumb() {
    const breadcrumbs = useBreadcrumbs()

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <Fragment key={breadcrumb.id}>
                        <BreadcrumbItem>
                            {renderBreadcrumb(breadcrumb, index === breadcrumbs.length - 1)}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
