// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session')?.value;
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const filename = `portfolio_${Date.now()}.${ext}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('portfolio-images')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Upload error:', error);
            return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(filename);

        return NextResponse.json({
            ok: true,
            url: urlData.publicUrl,
            path: data.path
        });
    } catch (e) {
        console.error('Upload failed:', e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
