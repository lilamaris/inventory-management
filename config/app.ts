export interface AppMeta {
    versionRoutePrefix: string
    version: string
    name: string
    description: string
}

export const appMeta: AppMeta = {
    versionRoutePrefix: '/console',
    version: '0.0.1',
    name: 'Package Inc.',
    description: 'Package Inc. is a simple package management system.',
}
