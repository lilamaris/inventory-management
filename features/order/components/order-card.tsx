import formatTime from '@/lib/utils/formatTime'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import OrderItems from '@/features/order/components/order-items'
import OrderStatus from '@/features/order/components/order-status'
import { Order } from '@/features/order/type'

export default function OrderCard({ order, index }: { order: Order; index: number }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center text-3xl font-bold text-muted-foreground">
                            Order #{index + 1}
                        </div>
                        <div className="flex items-center gap-2">
                            <OrderStatus status={order.status} />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Edit />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trash />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <p className="text-md font-semibold">To {order.vendor.name}</p>
                </CardTitle>
                <CardDescription>
                    <p className="text-sm text-muted-foreground">On {formatTime(order.createdAt)}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <OrderItems items={order.items} />
                    <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                </div>
            </CardContent>
        </Card>
    )
}
