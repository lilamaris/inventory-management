'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'
import { signInCredentialsAction } from '@/lib/action/auth'
import { Loader2 } from 'lucide-react'

export interface Props extends React.ComponentProps<'div'> {
    redirectTo?: string
}

export const SignInForm = ({ redirectTo, ...props }: Props) => {
    const [state, formAction, isPending] = useActionState(signInCredentialsAction, undefined)
    return (
        <form action={formAction}>
            <input type="hidden" name="provider" value="credentials" />
            <input type="hidden" name="redirectTo" value={redirectTo || '/'} />
            <div className="grid gap-6 mb-2">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        defaultValue={state?.payload?.email || ''}
                        placeholder="example@example.com"
                        disabled={isPending}
                        required
                    />
                    {state?.errors?.email && (
                        <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>
                    )}
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#/forgot-password" className="text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        disabled={isPending}
                        required
                    />
                    {state?.errors?.password && (
                        <p className="text-sm text-destructive">{state.errors.password.join(', ')}</p>
                    )}
                </div>
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="size-4 animate-spin" />}
                    Sign in
                </Button>
                {state?.message && <p className="text-center text-sm text-destructive">{state.message}</p>}
            </div>
        </form>
    )
}
