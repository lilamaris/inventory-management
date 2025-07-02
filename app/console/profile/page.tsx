'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import { Check, Eye } from 'lucide-react'

export default function ProfilePage() {
    const [showLongLiveToken, setShowLongLiveToken] = React.useState(false)
    return (
        <Card className="max-w-lg">
            <CardHeader>프로필 설정</CardHeader>
            <CardContent className="flex flex-col gap-8">
                <form>
                    <div className="flex flex-col gap-2">
                        <Label className="text-muted-foreground text-xs">닉네임</Label>
                        <div className="flex items-center gap-2">
                            <Input name="username" placeholder="닉네임 입력" />
                            <Button size="icon">
                                <Check className="size-4" />
                            </Button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground text-xs">Long Live Token</Label>
                    <div className="flex items-center gap-2">
                        <Input name="long live too" value="TEST" type={showLongLiveToken ? 'text' : 'password'} />
                        <Button size="icon" onClick={() => setShowLongLiveToken(!showLongLiveToken)}>
                            <Eye className="size-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
