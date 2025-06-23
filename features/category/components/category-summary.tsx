import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

import { Category } from '@/features/category/category.dto'

export default function CategorySummary({ category }: { category: Category }) {
    return (
        <Badge variant="outline" className="cursor-pointer">
            <Link href={`/vendor/${category.vendorId}/category/${category.id}`}>{category.name}</Link>
        </Badge>
    )
}
