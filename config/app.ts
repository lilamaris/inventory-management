export interface AppMeta {
    versionRoutePrefix: string
    version: string
    name: string
    description: string
}

export const appMeta: AppMeta = {
    versionRoutePrefix: '/console',
    version: '0.0.1',
    name: 'Inventory Inc.',
    description: 'Inventory Inc. is a simple inventory management system.',
}
