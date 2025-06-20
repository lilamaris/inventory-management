import { type NextRequest, NextResponse } from 'next/server'

import {
    getListing,
    listingItem,
    unlistingItem,
    updateListing,
    VendorItemError,
} from '@/features/vendor/service/listing'

interface PathParams {
    params: Promise<{ vendorId: string }>
}

export async function GET(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { vendorId } = await params

    const items = await getListing(vendorId)
    return NextResponse.json(items)
}

export async function POST(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { vendorId } = await params
    const { sku, name, description, price, quantity } = await request.json()

    try {
        await listingItem({
            vendorId,
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

export async function PUT(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { vendorId } = await params
    const { sku, name, description, price, quantity } = await request.json()

    try {
        await updateListing({
            vendorId,
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

export async function DELETE(request: NextRequest, { params }: PathParams): Promise<NextResponse> {
    const { vendorId } = await params
    const { sku } = await request.json()

    try {
        await unlistingItem(vendorId, sku)
    } catch (error) {
        if (error instanceof VendorItemError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success' })
}
