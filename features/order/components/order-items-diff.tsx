import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderItem } from '@/features/order/type'
import { getVendorItemQuantityByManyId } from '@/features/vendor/service/vendor'

export default async function OrderItemDiff({ vendorId, items }: { vendorId: string; items: OrderItem[] }) {
    const vendorItems = await getVendorItemQuantityByManyId(
        vendorId,
        items.map((item) => item.vendorItem.id),
    )
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Current Quantity</TableHead>
                    <TableHead>New Quantity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.vendorItem.name}</TableCell>
                        <TableCell>{vendorItems[item.vendorItem.id]}</TableCell>
                        <TableCell>{vendorItems[item.vendorItem.id] - item.quantity}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
