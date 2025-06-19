import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
    if (request.method === 'GET') {
        const response = NextResponse.next()
        const token = request.cookies.get('token')?.value ?? null
        if (token !== null) {
            response.cookies.set('session', token, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30,
            })
        }
        return response
    }

    // const originHeader = request.headers.get('Origin')
    // // NOTE: You may need to use `X-Forwarded-Host` instead
    // const hostHeader = request.headers.get('Host')
    // if (originHeader === null || hostHeader === null) {
    //     console.error('originHeader or hostHeader is null')
    //     console.log('originHeader', originHeader)
    //     console.log('hostHeader', hostHeader)
    //     return new NextResponse(null, {
    //         status: 403,
    //     })
    // }
    // let origin: URL
    // try {
    //     origin = new URL(originHeader)
    // } catch (error) {
    //     console.error('origin is not a valid URL')
    //     console.log('error', error)
    //     return new NextResponse(null, {
    //         status: 403,
    //     })
    // }
    // console.log('origin', origin)
    // if (origin.host !== hostHeader) {
    //     console.error('origin.host is not equal to hostHeader')
    //     console.log('origin.host', origin.host)
    //     console.log('hostHeader', hostHeader)
    //     return new NextResponse(null, {
    //         status: 403,
    //     })
    // }
    return NextResponse.next()
}
