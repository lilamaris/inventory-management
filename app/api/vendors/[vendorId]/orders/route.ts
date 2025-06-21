import { getPurchaseOrders } from '@/features/order/service/order'
import { type NextRequest, NextResponse } from 'next/server'

export interface PathParams {
    params: Promise<{ vendorId: string }>
}
export async function GET(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { vendorId } = await params

    const orders = await getPurchaseOrders({ vendorId })

    return NextResponse.json(orders)
}
