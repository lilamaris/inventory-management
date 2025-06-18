import Link from 'next/link'
import { Package2Icon } from 'lucide-react'

import { appMeta } from '@/config/app'
import TermsAndService from '@/components/auth-terms-and-service'
import LoginForm from '@/features/login/components/login-form'

export default async function Page() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <header className="flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <Package2Icon className="size-4" />
                        </div>
                        {appMeta.name}
                    </Link>
                </header>
                <main className="flex flex-col gap-6">
                    <LoginForm />
                    <TermsAndService />
                </main>
            </div>
        </div>
    )
}
