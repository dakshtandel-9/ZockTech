// app/admin/login/submit/route.js
import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin_session';

export async function POST(req) {
    try {
        const form = await req.formData();
        const password = String(form.get('password') || '');
        const expected = process.env.ADMIN_PASSWORD || 'dakshTandel';

        if (password !== expected) {
            // Wrong password → go back to login with error
            return NextResponse.redirect(new URL('/admin/login?error=1', req.url));
        }

        // Success → set cookie and redirect to /admin/leads
        const res = NextResponse.redirect(new URL('/admin/leads', req.url));
        res.cookies.set(ADMIN_COOKIE, 'ok', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 8, // 8h
        });
        return res;
    } catch (e) {
        // Fallback to avoid staying on page
        return NextResponse.redirect(new URL('/admin/login?error=server', req.url));
    }
}
