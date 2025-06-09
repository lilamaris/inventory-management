import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AppThemeController } from '@/components/layout/app-theme-controller'
import { HeaderBreadcrumb } from '@/components/layout/header-breadcrumb'
import { cn } from '@/lib/utils'

export function AppHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <header
            className={cn('flex h-(--header-height) overflow-hidden shrink-0 items-center gap-2 border-b', className)}
            {...props}
        >
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <div className="flex-1 truncate">
                    <HeaderBreadcrumb />
                </div>
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <div className="flex items-center gap-2">
                    <AppThemeController />
                </div>
            </div>
        </header>
    )
}
