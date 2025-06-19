import { NextResponse } from 'next/server'
import {
    getVendorItem,
    listingItem,
    unlistingItem,
    updateVendorItem,
    VendorItemError,
} from '@/features/vendor/service/vendorItem'

export async function GET(request: Request, { params }: { params: Promise<{ vendorId: string }> }): Promise<Response> {
    const { vendorId } = await params
    const items = await getVendorItem({ vendorId })
    return NextResponse.json(items)
}

export async function POST(request: Request, { params }: { params: Promise<{ vendorId: string }> }): Promise<Response> {
    const { vendorId } = await params

    const { sku, name, description, price, quantity } = await request.json()

    try {
        await listingItem({
            vendorId,
            mode: 'new',
            sku,
            name,
            description,
            price,
            quantity,
        })
    } catch (error) {
        if (error instanceof VendorItemError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success' })
}

export async function PUT(request: Request, { params }: { params: Promise<{ vendorId: string }> }): Promise<Response> {
    const { vendorId } = await params
    const { itemId, price, quantity } = await request.json()

    try {
        await updateVendorItem(
            {
                vendorId_itemId: { vendorId, itemId },
            },
            price,
            quantity,
        )
    } catch (error) {
        if (error instanceof VendorItemError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success' })
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ vendorId: string }> },
): Promise<Response> {
    const { vendorId } = await params

    const { itemId } = await request.json()

    try {
        await unlistingItem(vendorId, itemId)
    } catch (error) {
        if (error instanceof VendorItemError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success' })
}
