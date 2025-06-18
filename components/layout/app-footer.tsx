import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function AppFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <footer
            className={cn('flex h-(--header-height) overflow-hidden shrink-0 items-center gap-2 border-t', className)}
            {...props}
        >
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <div className="flex-1 text-muted-foreground truncate">
                    <p className="text-sm">This application is example of a simple inventory management system.</p>
                    <p className="text-xs">
                        Built by{' '}
                        <Link className="underline" href="https://github.com/lilamaris">
                            Lilamaris
                        </Link>
                    </p>
                </div>
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link href="https://github.com/lilamaris/inventory-management">
                            <svg
                                className="fill-foreground"
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <span className="hidden lg:block">Github</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </footer>
    )
}
