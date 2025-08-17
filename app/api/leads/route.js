import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        // Basic validation
        const required = ['name', 'email'];
        for (const k of required) {
            if (!data[k] || String(data[k]).trim() === '') {
                return NextResponse.json({ error: `${k} is required` }, { status: 400 });
            }
        }

        // Capture meta
        const ua = req.headers.get('user-agent') || '';
        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            req.ip ||
            '';

        const lead = await Lead.create({
            ...data,
            ip,
            userAgent: ua,
        });

        return NextResponse.json({ ok: true, id: lead._id }, { status: 201 });
    } catch (err) {
        console.error('Lead create error:', err);
        return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
    }
}
