export interface AppConfig {
    versionRoutePrefix: string
    version: string
    name: string
    description: string
}

export const appConfig: AppConfig = {
    versionRoutePrefix: 'v0',
    version: '0.0.1',
    name: 'Inventory Inc.',
    description: 'Inventory Inc. is a simple inventory management system.',
}
