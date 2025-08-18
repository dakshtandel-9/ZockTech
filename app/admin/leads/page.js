// app/admin/leads/page.js
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import LeadsClient from './LeadsClient';

export const dynamic = 'force-dynamic';

export default async function LeadsAdminPage() {
    const cookieStore = await cookies();
    const has = cookieStore.get('admin_session')?.value;
    if (!has) redirect('/admin/login');

    let leads = [];
    try {
        await dbConnect();
        leads = await Lead.find(
            {},
            'name email phone projectType budget timeline message createdAt'
        )
            .sort({ createdAt: -1 })
            .lean();
    } catch (e) {
        console.error('DB error:', e instanceof Error ? e.stack || e.message : JSON.stringify(e));
    }

    return <LeadsClient leads={JSON.parse(JSON.stringify(leads))} />;
}
