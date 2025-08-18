// app/api/health/db/route.js
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';

export async function GET() {
    try {
        const conn = await dbConnect();
        return NextResponse.json({ ok: true, host: conn?.connection?.host || 'unknown' });
    } catch (e) {
        return NextResponse.json(
            { ok: false, error: e instanceof Error ? e.message : String(e) },
            { status: 500 }
        );
    }
}
