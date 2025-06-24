import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CategorySummary from '@/features/category/components/category-summary'
import { Vendor } from '@/features/composite/vendor.dto'
import VendorAvatar from '@/features/vendor/components/vendor-avatar'
import ItemAvatar from '@/features/item/components/item-avatar'

export default function VendorCard({ vendor }: { vendor: Vendor }) {
    return (
        <Card className="truncate">
            <CardHeader>
                <p className="text-xs text-muted-foreground">Store</p>
                <VendorAvatar vendor={vendor} />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-muted-foreground">Categories</p>
                    {vendor.categories.map((category) => (
                        <CategorySummary key={category.id} category={category} />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-muted-foreground">Items</p>
                    {vendor.items.map((item) => (
                        <ItemAvatar key={item.id} item={item} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
