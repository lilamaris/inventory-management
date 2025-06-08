import { signOut } from '@/lib/auth'

export const GET = async () => {
    await signOut({ redirectTo: '/auth/signin' })
}
