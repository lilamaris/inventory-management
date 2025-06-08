import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GalleryVerticalEnd } from 'lucide-react'

import { SignInForm } from '@/components/auth/signin-form'
import { providerMap } from '@/lib/auth'
import { SignInProviderButton } from '@/components/auth/signin-provider-button'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Inventory Inc.
                </Link>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Welcome Back</CardTitle>
                            <CardDescription>Sign in with your</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                {providerMap.map((provider) => (
                                    <SignInProviderButton
                                        className="w-full"
                                        variant="outline"
                                        key={provider.id}
                                        id={provider.id}
                                        name={provider.name}
                                    />
                                ))}
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                <SignInForm />
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/auth/signup" className="text-sm underline-offset-4 hover:underline">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
