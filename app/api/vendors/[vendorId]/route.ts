import { getVendorUnique } from '@/features/vendor/api/vendor'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ vendorId: string }> }) {
    const { vendorId } = await params

    const vendor = await getVendorUnique({ where: { id: vendorId } })
    return NextResponse.json(vendor)
}
