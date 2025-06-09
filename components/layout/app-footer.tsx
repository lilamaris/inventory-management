import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AppThemeController } from '@/components/layout/app-theme-controller'
import { HeaderBreadcrumb } from '@/components/layout/header-breadcrumb'
import { cn } from '@/lib/utils'

export function AppFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <footer className={cn('flex h-(--header-height) shrink-0 items-center gap-2 border-t', className)} {...props}>
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
        </footer>
    )
}
