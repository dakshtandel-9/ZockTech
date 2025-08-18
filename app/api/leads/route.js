// app/api/leads/route.js
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function POST(req) {
    try {
        const data = await req.json();

        const required = ['name', 'email', 'phone', 'message'];
        for (const k of required) {
            if (!data[k] || String(data[k]).trim() === '') {
                return NextResponse.json({ error: `Missing ${k}` }, { status: 400 });
            }
        }

        await dbConnect();

        const doc = await Lead.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            website: data.website || '',
            projectType: data.projectType || '',
            budget: data.budget || '',
            timeline: data.timeline || '',
            message: data.message,
            source: data.source || 'website',
        });

        return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 });
    } catch (e) {
        console.error('POST /api/leads failed:', e instanceof Error ? e.stack || e.message : e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
