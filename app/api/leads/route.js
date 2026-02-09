// app/api/leads/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
    try {
        const data = await req.json();

        const required = ['name', 'email', 'phone', 'message'];
        for (const k of required) {
            if (!data[k] || String(data[k]).trim() === '') {
                return NextResponse.json({ error: `Missing ${k}` }, { status: 400 });
            }
        }

        const { data: doc, error } = await supabase
            .from('leads')
            .insert([
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    website: data.website || '',
                    project_type: data.projectType || '',
                    budget: data.budget || '',
                    timeline: data.timeline || '',
                    message: data.message,
                    source: data.source || 'website',
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, id: String(doc.id) }, { status: 201 });
    } catch (e) {
        console.error('POST /api/leads failed:', e instanceof Error ? e.stack || e.message : e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
