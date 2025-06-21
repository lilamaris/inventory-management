import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getVendorById } from '@/features/vendor/service/vendor'
import { getCurrentSession } from '@/lib/server/session'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import OrderStatus from '@/features/order/components/order-status'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export interface PathParams {
    params: Promise<{ vendorId: string }>
}
export default async function VendorPage({ params }: PathParams) {
    const { session, user } = await getCurrentSession()
    if (!session || !user) {
        redirect('/auth/login')
    }

    const { vendorId } = await params
    const vendor = await getVendorById(vendorId)
    if (!vendor) {
        redirect('/console/vendor')
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2">
                <Image
                    src={'https://picsum.photos/200?blur=2'}
                    className="rounded-xl object-cover"
                    alt={vendor.name}
                    width={200}
                    height={200}
                />
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>{vendor.name}</CardTitle>
                        <CardDescription>{vendor.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-sm font-medium">Managers</h2>
                            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                {vendor.managers.map((manager) => (
                                    <Avatar key={manager.id}>
                                        <AvatarImage src={manager.user.avatarUrl ?? ''} alt={manager.user.name} />
                                        <AvatarFallback>{manager.user.name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <h1 className="text-2xl font-bold">Items</h1>
            <Card>
                <CardContent>
                    <Table>
                        <TableCaption>A list of items provided by the vendor.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendor.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price * item.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <h1 className="text-2xl font-bold">Purchase Orders</h1>
            <Card>
                <CardContent>
                    <Table>
                        <TableCaption>A list of purchase orders for the vendor.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order Date</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendor.purchaseOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>
                                        <OrderStatus status={order.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="icon" variant="ghost" asChild>
                                            <Link href={`/console/vendor/${vendorId}/order/${order.id}`}>
                                                <ArrowRightIcon className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
