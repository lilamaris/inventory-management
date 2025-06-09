import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'
import { AppThemeController } from './app-theme-controller'
import { HeaderBreadcrumb } from './header-breadcrumb'

export function AppHeader() {
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <div className="flex-1">
                    <HeaderBreadcrumb />
                </div>
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <div className="ml-auto flex items-center gap-2">
                    <AppThemeController />
                </div>
            </div>
        </header>
    )
}
