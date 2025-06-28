'use client'

import { usePathname } from 'next/navigation'
import { routeTree, type RouteNode } from '@/config/routeTree'

export interface UseBreadcrumbsOptions {
    rootPath?: string
}

export function useBreadcrumbs(options?: UseBreadcrumbsOptions): RouteNode[] {
    const pathname = usePathname()
    const { rootPath = '/console' } = options ?? {}
    const segments = pathname.split('/').filter(Boolean).slice(1)

    let candidate: RouteNode[] = Object.values(routeTree)
    const breadcrumbs = segments.reduce<RouteNode[]>(
        (crumbs, segment) => {
            const found = candidate.find((node) => node.id === segment)
            if (!found) return crumbs

            candidate = found.subRoutes ?? []

            return [...crumbs, found]
        },
        [{ id: 'home', label: 'Home', href: rootPath }],
    )

    return breadcrumbs
}
