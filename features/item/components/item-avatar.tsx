import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { Item } from '@/features/item/dto.primitive'

export default function ItemAvatar({ item }: { item: Item }) {
    return (
        <Link href={`/vendor/${item.vendorId}/item/${item.id}`} className="flex items-center gap-2">
            <Avatar>
                <AvatarImage src={item.thumbnailUrl ?? undefined} />
                <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h1 className="hover:underline">{item.name}</h1>
                <p className="text-xs text-muted-foreground max-w-[20ch] truncate">{item.description}</p>
            </div>
        </Link>
    )
}
