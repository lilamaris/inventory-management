import { Edit } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import OrderStatus from '@/features/order/components/order-status'
import { Order } from '@/features/order/type'
import { formatTime } from '@/lib/utils'
import OrderItemDiff from '@/features/order/components/order-items-diff'
import OrderItems from '@/features/order/components/order-items'

export interface VendorOrderActionProps {
    order: Order
}

function OrderEditSheet({ order }: { order: Order }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Edit />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Order</SheetTitle>
                    <SheetDescription className="flex flex-col gap-2">
                        <OrderStatus status={order.status} />
                        <span>Order Id: {order.id}</span>
                        <span>Order at: {formatTime(order.createdAt)}</span>
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 mx-4">
                    <OrderItems items={order.items} />
                    <OrderItemDiff vendorId={order.vendorId} items={order.items} />
                </div>
                <SheetFooter></SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default function VendorOrderAction({ order }: VendorOrderActionProps) {
    return (
        <>
            <OrderStatus status={order.status} />
            <OrderEditSheet order={order} />
        </>
    )
}
