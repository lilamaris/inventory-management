export interface VendorOrderDescriptionProps {
    orderFromName: string
    orderAt: Date
}

export default function VendorOrderDescription({ orderFromName, orderAt }: VendorOrderDescriptionProps) {
    return (
        <div>
            <p>Order from {orderFromName}</p>
            <p>Order at {orderAt.toLocaleDateString()}</p>
        </div>
    )
}
