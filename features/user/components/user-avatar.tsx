import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User } from '@/features/user/dto.primitive'
import Link from 'next/link'

export default function UserAvatar({ user }: { user: User }) {
    return (
        <Link href={`/user/${user.id}`} className="group flex items-center gap-2">
            <Avatar>
                <AvatarImage src={user.avatarUrl ?? undefined} />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h1 className="group-hover:underline">{user.name}</h1>
            </div>
        </Link>
    )
}
