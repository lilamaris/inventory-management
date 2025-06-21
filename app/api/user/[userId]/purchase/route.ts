import { type NextRequest, NextResponse } from 'next/server'

import { createOrder, getOrders, OrderError } from '@/features/order/service/order'

interface PathParams {
    params: Promise<{ userId: string }>
}

export async function GET(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { userId } = await params

    const orders = await getOrders({ userId })

    return NextResponse.json(orders)
}

export async function POST(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { userId } = await params
    const { vendorId, items } = await request.json()

    try {
        const order = await createOrder({
            userId,
            vendorId,
            items,
        })

        return NextResponse.json(order)
    } catch (error) {
        if (error instanceof OrderError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
