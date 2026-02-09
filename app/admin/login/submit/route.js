// app/admin/login/submit/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ADMIN_COOKIE = 'admin_session';

export async function POST(req) {
    const form = await req.formData();
    const password = String(form.get('password') || '');

    // 1. Try to get password from Supabase
    let expected = null;
    try {
        const { data, error } = await supabase
            .from('admin_settings')
            .select('value')
            .eq('key', 'admin_password')
            .single();

        if (data && !error) {
            expected = data.value;
        }
    } catch (e) {
        console.error('Error fetching admin password from DB:', e);
    }

    // 2. Fallback to Env variable or hardcoded default
    if (!expected) {
        expected = process.env.ADMIN_PASSWORD || 'dakshTandel';
    }

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
