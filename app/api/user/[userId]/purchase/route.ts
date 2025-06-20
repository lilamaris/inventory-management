import { type NextRequest, NextResponse } from 'next/server'

import { createPurchaseOrder, getPurchaseOrders, PurchaseOrderError } from '@/features/order/service/order'

interface PathParams {
    params: Promise<{ userId: string }>
}

export async function GET(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { userId } = await params

    const purchaseOrders = await getPurchaseOrders({ userId })

    return NextResponse.json(purchaseOrders)
}

export async function POST(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { userId } = await params
    const { vendorId, items } = await request.json()

    try {
        const purchaseOrder = await createPurchaseOrder({
            userId,
            vendorId,
            items,
        })

        return NextResponse.json(purchaseOrder)
    } catch (error) {
        if (error instanceof PurchaseOrderError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
