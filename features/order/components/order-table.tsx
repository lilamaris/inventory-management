import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import OrderStatus from '@/features/order/components/order-status'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { Order } from '@/features/order/type'

export default function OrderTable({ orders, vendorId }: { orders: Order[]; vendorId: string }) {
    return (
        <Table>
            <TableCaption>A list of purchase orders for the vendor.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Order Date</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                            <OrderStatus status={order.status} />
                        </TableCell>
                        <TableCell className="text-right">
                            <Button size="icon" variant="ghost" asChild>
                                <Link href={`/console/vendor/${vendorId}/order/${order.id}`}>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
