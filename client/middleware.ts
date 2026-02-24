import { type NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME as string

export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	const session = cookies.get(SESSION_COOKIE_NAME)?.value
	const isAuthPage = url.includes('/auth')

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard/settings', url))
		}

		return NextResponse.next()
	}

	if (!session) {
		return NextResponse.redirect(new URL('/auth/login', url))
	}
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*']
}
