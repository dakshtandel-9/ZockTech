// app/api/portfolio/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

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

// POST - Create new portfolio item (admin only)
export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session')?.value;
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, tag, href, image_url } = body;

        if (!title || !tag || !href) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get max display_order
        const { data: maxOrder } = await supabase
            .from('portfolio')
            .select('display_order')
            .order('display_order', { ascending: false })
            .limit(1)
            .single();

        const newOrder = (maxOrder?.display_order || 0) + 1;

        const { data, error } = await supabase
            .from('portfolio')
            .insert([{
                title,
                tag,
                href,
                image_url: image_url || '',
                display_order: newOrder
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ ok: true, item: data }, { status: 201 });
    } catch (e) {
        console.error('POST /api/portfolio failed:', e);
        return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
    }
}
