'use client'

import { usePathname } from 'next/navigation'
import { routeTree, type RouteNode } from '@/config/routeTree'

export interface UseBreadcrumbsOptions {
    rootPath?: string
}

export function useBreadcrumbs(options?: UseBreadcrumbsOptions): RouteNode[] {
    const pathname = usePathname()
    const { rootPath = '/' } = options ?? {}
    const crumbs: RouteNode[] = [{ id: 'home', label: 'Home', href: rootPath }]
    const segments = pathname.split('/').filter(Boolean).slice(1)

    let candidate: RouteNode[] = Object.values(routeTree)
    for (const segment of segments) {
        const found = candidate.find((node) => node.id === segment)
        if (!found) break

        crumbs.push(found)
        candidate = found.subRoutes ?? []
    }

    return crumbs
}
