'use client'

import Link from 'next/link'
import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'

import signupAction from '@/features/signup/action'

export default function SignupForm({ className, action, ...props }: React.ComponentProps<'form'>) {
    const [state, formAction, isPending] = React.useActionState(signupAction, undefined)

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">환영합니다</CardTitle>
                <CardDescription>계정을 생성하여 시작해주세요</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className={cn('grid gap-6', className)} {...props}>
                    <div className="grid gap-3">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" />
                        {state?.errors?.name && <p className="text-xs text-destructive">{state.errors.name}</p>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" name="email" type="email" placeholder="mail@example.com" />
                        {state?.errors?.email && <p className="text-xs text-destructive">{state.errors.email}</p>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input id="password" name="password" type="password" placeholder="********" />
                        {state?.errors?.password && <p className="text-xs text-destructive">{state.errors.password}</p>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="********" />
                        {state?.errors?.confirmPassword && (
                            <p className="text-xs text-destructive">{state.errors.confirmPassword}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? <Loader2Icon className="size-4 animate-spin" /> : '회원가입'}
                    </Button>
                    <div className="text-center text-sm">
                        계정이 있으신가요?{' '}
                        <Link href="/auth/login" className="underline underline-offset-4">
                            로그인
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
