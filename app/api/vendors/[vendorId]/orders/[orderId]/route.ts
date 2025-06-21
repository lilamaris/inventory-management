import { type NextRequest, NextResponse } from 'next/server'

export interface PathParams {
    params: Promise<{ vendorId: string; orderId: string }>
}

export async function GET(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { vendorId, orderId } = await params

    const order = await getVendorOrderById({ vendorId, orderId })
}

export async function PUT(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { vendorId } = await params

    const { action, orderId } = await request.json()
}
