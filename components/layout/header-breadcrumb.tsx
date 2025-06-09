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
import { RouteNode } from '@/lib/definition/appmeta'
import { Fragment } from 'react'

function subrouteBreadcrumb(breadcrumb: RouteNode) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group/dropdown-menu">
                <div className="flex items-center gap-2">
                    {breadcrumb.label}
                    <ChevronDown className="self-end size-4 transition-transform group-data-[state=open]/dropdown-menu:rotate-180" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {breadcrumb.subRoutes?.map((subRoute) => (
                    <DropdownMenuItem key={subRoute.id}>
                        <BreadcrumbLink href={subRoute.href}>{subRoute.label}</BreadcrumbLink>
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

export function HeaderBreadcrumb() {
    const breadcrumbs = useBreadcrumbs()

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <Fragment key={`${breadcrumb.id}`}>
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
