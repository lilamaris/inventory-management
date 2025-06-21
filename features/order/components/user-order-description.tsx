export interface UserOrderDescriptionProps {
    orderToName: string
    orderAt: Date
}

export default function UserOrderDescription({ orderToName, orderAt }: UserOrderDescriptionProps) {
    return (
        <div>
            <p>Order to {orderToName}</p>
            <p>Order at {orderAt.toLocaleDateString()}</p>
        </div>
    )
}
