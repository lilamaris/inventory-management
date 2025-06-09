import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { navigationMap } from '@/lib/definition/appmeta'

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar navigations={navigationMap} variant="inset" />
            <SidebarInset>
                <main>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}
