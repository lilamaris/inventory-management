import { getPurchaseOrders } from '@/features/order/service/order'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ vendorId: string }> },
): Promise<NextResponse> {
    const { vendorId } = await params

    const purchaseOrders = await getPurchaseOrders({ vendorId })

    return NextResponse.json(purchaseOrders)
}
