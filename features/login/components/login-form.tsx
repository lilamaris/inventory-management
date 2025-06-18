'use client'

import Link from 'next/link'
import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import GithubLoginButton from '@/features/login/components/github-login-button'
import GoogleLoginButton from '@/features/login/components/google-login-button'
import loginAction from '@/features/login/action'

export default function LoginForm({ className, action, ...props }: React.ComponentProps<'form'>) {
    const [state, formAction, isPending] = React.useActionState(loginAction, undefined)

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>Login with your Apple or Google account</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className={cn('grid gap-6', className)} {...props}>
                    <div className="flex flex-col gap-4">
                        <GithubLoginButton />
                        <GoogleLoginButton />
                    </div>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? <Loader2Icon className="size-4 animate-spin" /> : 'Login'}
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/auth/signup" className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
