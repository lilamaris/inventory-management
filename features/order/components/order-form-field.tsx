import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Order } from '@/features/order/dto.primitive'
import { OrderStatus } from '@/generated/prisma'

export interface OrderFormFieldProps {
    defaultValue: Order | null
}
export default function OrderFormField(props: OrderFormFieldProps) {
    const { defaultValue } = props
    return (
        <>
            <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                        <SelectItem value={OrderStatus.APPROVED}>Approved</SelectItem>
                        <SelectItem value={OrderStatus.REJECTED}>Rejected</SelectItem>
                        <SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
                        <SelectItem value={OrderStatus.DELIVERED}>Delivered</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <pre>{JSON.stringify(defaultValue, null, 2)}</pre>
                <Label>Order Items</Label>
            </div>
        </>
    )
}
