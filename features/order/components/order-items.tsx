import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { OrderItem } from '@/features/order/type'

export default function OrderItems({ items }: { items: OrderItem[] }) {
    return (
        <div className="flex flex-col gap-2">
            <Table>
                <TableCaption>A list of your recent orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.vendorItem.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.vendorItem.price}</TableCell>
                            <TableCell>{item.vendorItem.price * item.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell>
                            {items.reduce((acc, item) => acc + item.vendorItem.price * item.quantity, 0)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
