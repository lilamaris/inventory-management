import { Button } from '@/components/ui/button'
import { PurchaseOrderStatus } from '@/generated/prisma'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import OrderStatus from './order-status'

export interface UserOrderActionProps {
    vendorId: string
    orderId: string
    orderStatus: PurchaseOrderStatus
}

export default function UserOrderAction({ vendorId, orderId, orderStatus }: UserOrderActionProps) {
    return (
        <>
            <OrderStatus status={orderStatus} />
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
        </>
    )
}
