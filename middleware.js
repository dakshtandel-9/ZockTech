// /middleware.js
import { NextResponse } from 'next/server';
const ADMIN_COOKIE = 'admin_session';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const hasSession = req.cookies.get(ADMIN_COOKIE)?.value;

    // Allow Next internals and static assets
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|txt|map)$/)
    ) return NextResponse.next();

    // Allow login and submit endpoints
    if (pathname === '/admin/login' || pathname === '/admin/login/submit') {
        return NextResponse.next();
    }

    // Protect /admin root
    if (pathname === '/admin') {
        const url = req.nextUrl.clone();
        url.pathname = hasSession ? '/admin/leads' : '/admin/login';
        return NextResponse.redirect(url);
    }

    // Protect all other /admin paths
    if (pathname.startsWith('/admin/')) {
        if (!hasSession) {
            const url = req.nextUrl.clone();
            url.pathname = '/admin/login';
            url.searchParams.set('next', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
