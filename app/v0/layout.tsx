import { AppFooter } from '@/components/layout/app-footer'
import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset className="h-screen md:h-[calc(100vh-1rem)]">
                <AppHeader className="sticky top-0 z-10" />
                <div className="@container/main p-4 overflow-y-auto flex-1">{children}</div>
                <AppFooter className="sticky bottom-0 z-10" />
            </SidebarInset>
        </SidebarProvider>
    )
}
