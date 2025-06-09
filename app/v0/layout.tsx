import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <main className="flex flex-1 flex-col">
                    <AppHeader />
                    <div className="flex flex-1 flex-col">{children}</div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
