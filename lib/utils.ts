import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RouteNode } from './definition/appmeta'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function buildRouteTree(tree: Record<string, RouteNode>, parentPath = ''): RouteNode[] {
    return Object.values(tree).map((route) => buildNode(route, parentPath))
}

function buildNode(node: RouteNode, parentPath = ''): RouteNode {
    const href = `${parentPath}/${node.id}`
    const result: RouteNode = { ...node, href }
    if (node.subRoutes)
        result.subRoutes = node.subRoutes.map((child) => buildNode(child, href)) as [RouteNode, ...RouteNode[]]
    return result
}
