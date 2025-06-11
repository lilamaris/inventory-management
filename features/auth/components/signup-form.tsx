'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { signUpCredentialsAction } from '@/features/auth/actions/auth'
import { Loader2 } from 'lucide-react'

export interface Props extends React.ComponentProps<'div'> {
    redirectTo?: string
}

export const SignUpForm = ({ redirectTo, ...props }: Props) => {
    const [state, formAction, isPending] = useActionState(signUpCredentialsAction, undefined)
    return (
        <form action={formAction}>
            <input type="hidden" name="provider" value="credentials" />
            <input type="hidden" name="redirectTo" value={redirectTo || '/'} />
            <div className="grid gap-6 mb-2">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={state?.payload?.name || ''}
                        placeholder="John Doe"
                        disabled={isPending}
                        required
                    />
                    {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name.join(', ')}</p>}
                </div>
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        disabled={isPending}
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        disabled={isPending}
                        required
                    />
                    {state?.errors?.password && (
                        <p className="text-sm text-destructive">{state.errors.password.join(', ')}</p>
                    )}
                    {state?.errors?.confirmPassword && (
                        <p className="text-sm text-destructive">{state.errors.confirmPassword.join(', ')}</p>
                    )}
                </div>
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="size-4 animate-spin" />}
                    Sign up
                </Button>
                {state?.message && <p className="text-center text-sm text-destructive">{state.message}</p>}
            </div>
        </form>
    )
}
