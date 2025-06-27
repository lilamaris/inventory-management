import { ManagerWith } from '@/features/manager/dto.composite'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function ManagerAvatar({ manager }: { manager: ManagerWith<['user']> }) {
    return (
        <Avatar>
            {manager.user.avatarUrl && <AvatarImage src={manager.user.avatarUrl} />}
            <AvatarFallback>{manager.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
    )
}
