import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Vendor } from '@/features/vendor/dto.primitive'
import Link from 'next/link'

export default function VendorAvatar({ vendor }: { vendor: Vendor }) {
    return (
        <Link href={`/console/vendors/${vendor.id}`} className="group flex items-center gap-2">
            <Avatar>
                <AvatarImage src={vendor.thumbnailUrl ?? undefined} />
                <AvatarFallback>{vendor.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h1 className="group-hover:underline">{vendor.name}</h1>
                <p className="text-xs text-muted-foreground max-w-[20ch] truncate">{vendor.description}</p>
            </div>
        </Link>
    )
}
