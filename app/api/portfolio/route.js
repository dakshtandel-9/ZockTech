// app/api/portfolio/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// GET - Fetch all portfolio items (public)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;

        return NextResponse.json({ ok: true, items: data || [] });
    } catch (e) {
        console.error('GET /api/portfolio failed:', e);
        return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
    }
}
