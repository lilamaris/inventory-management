import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PropsWithChildren } from 'react'
import { OrderWithPartial } from '@/features/order/dto.composite'
import UserAvatar from '@/features/user/components/user-avatar'
import { formatTime } from '@/lib/utils'
import VendorAvatar from '@/features/vendor/components/vendor-avatar'
import ItemAvatar from '@/features/item/components/item-avatar'

export interface OrderSheetProps {
    order: OrderWithPartial<['orderByUser' | 'vendor' | 'orderItems' | 'orderTransactions']>
    triggerIcon: React.ReactNode
}

export default function OrderSheet({ order, triggerIcon, children }: PropsWithChildren<OrderSheetProps>) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    {triggerIcon}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Order</SheetTitle>
                    <SheetDescription className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Order #{order.id}</span>
                        <span className="text-sm text-muted-foreground">{formatTime(order.createdAt)}</span>
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 mx-4">
                    {order.orderByUser && (
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-muted-foreground">Order by</span>
                            <UserAvatar user={order.orderByUser} />
                        </div>
                    )}
                    {order.vendor && (
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-muted-foreground">Vendor</span>
                            <VendorAvatar vendor={order.vendor} />
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted-foreground">Order items</span>
                        <div className="flex flex-col gap-2">
                            {order.orderItems?.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <ItemAvatar item={item.item} />
                                    <span className="text-sm">
                                        {item.quantity} x {item.item.price} = {item.quantity * item.item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}
