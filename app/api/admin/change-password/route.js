import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session')?.value;

        // Simple session check (matching the check in leads/page.js)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { newPassword } = await req.json();

        if (!newPassword || newPassword.length < 4) {
            return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 });
        }

        // Store password in a 'settings' table
        const { error } = await supabase
            .from('admin_settings')
            .upsert({ key: 'admin_password', value: newPassword }, { onConflict: 'key' });

        if (error) {
            console.error('Supabase error updating password:', error);
            return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error('Change password failed:', e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
