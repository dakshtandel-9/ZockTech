// app/admin/login/submit/route.js
import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin_session';

export async function POST(req) {
    const form = await req.formData();
    const password = String(form.get('password') || '');
    const expected = process.env.ADMIN_PASSWORD || 'dakshTandel';

    if (password !== expected) {
        return NextResponse.redirect(new URL('/admin/login?error=1', req.url));
    }

    const res = NextResponse.redirect(new URL('/admin/leads', req.url));
    res.cookies.set(ADMIN_COOKIE, 'ok', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        maxAge: 60 * 60 * 8,
    });
    return res;
}
