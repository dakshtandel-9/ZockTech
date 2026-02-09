// app/api/health/db/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase.from('leads').select('count', { count: 'exact', head: true });
        if (error) throw error;
        return NextResponse.json({ ok: true, status: 'Supabase connected' });
    } catch (e) {
        return NextResponse.json(
            { ok: false, error: e instanceof Error ? e.message : String(e) },
            { status: 500 }
        );
    }
}
