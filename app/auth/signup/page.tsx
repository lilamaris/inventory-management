import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Package2Icon } from 'lucide-react'

import { getCurrentSession } from '@/lib/server/session'

import SignupForm from '@/features/signup/components/signup-form'
import TermsAndService from '@/features/signup/components/terms-and-service'

export default async function Page() {
    const { session, user } = await getCurrentSession()
    if (session !== null) {
        return redirect('/')
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <header className="flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <Package2Icon className="size-4" />
                        </div>
                        Package Inc.
                    </Link>
                </header>
                <main className="flex flex-col gap-6">
                    <SignupForm />
                    <TermsAndService />
                </main>
            </div>
        </div>
    )
}
