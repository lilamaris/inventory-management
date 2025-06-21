import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Order } from '@/features/order/type'
import { Button } from '@/components/ui/button'

export interface OrderRecipeProps {
    index: number
    order: Order
    description: (order: Order) => React.ReactNode
    action: (order: Order) => React.ReactNode
}

export default function OrderRecipe({
    order,
    index,
    description,
    action,
    children,
}: React.PropsWithChildren<OrderRecipeProps>) {
    return (
        <Card key={order.id}>
            <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center text-3xl font-bold text-muted-foreground">
                            Order #{index + 1}
                        </div>
                        <div className="flex items-center gap-2">{action(order)}</div>
                    </div>
                </CardTitle>
                <CardDescription>{description(order)}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">{children}</div>
            </CardContent>
        </Card>
    )
}
