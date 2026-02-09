// app/api/portfolio/[id]/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

// PUT - Update portfolio item
export async function PUT(req, { params }) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session')?.value;
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { title, tag, href, image_url, display_order } = body;

        const updates = {};
        if (title !== undefined) updates.title = title;
        if (tag !== undefined) updates.tag = tag;
        if (href !== undefined) updates.href = href;
        if (image_url !== undefined) updates.image_url = image_url;
        if (display_order !== undefined) updates.display_order = display_order;

        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('portfolio')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ ok: true, item: data });
    } catch (e) {
        console.error('PUT /api/portfolio/[id] failed:', e);
        return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
    }
}

// DELETE - Delete portfolio item
export async function DELETE(req, { params }) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session')?.value;
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const { error } = await supabase
            .from('portfolio')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error('DELETE /api/portfolio/[id] failed:', e);
        return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
    }
}
