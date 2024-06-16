import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log({ token });
    if (!token) {
        // Redirect to login page if no auth token is found
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Continue to the requested route if authenticated
    return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
    matcher: ['/vendor/:path*'],
};
