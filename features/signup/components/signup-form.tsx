'use client'

import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import signupAction from '@/features/signup/action'
import { cn } from '@/lib/utils'

export default function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
    const [state, formAction, isPending] = React.useActionState(signupAction, undefined)

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle>Welcome</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form className={cn('grid gap-6', className)} {...props} action={formAction}>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="mail@example.com" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="********" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="********" />
                    </div>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending && <Loader2Icon className="size-4 animate-spin" />}
                        Signup
                    </Button>
                    <div className="text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
