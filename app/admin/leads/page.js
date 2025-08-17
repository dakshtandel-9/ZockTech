import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/mongodb';
import Lead from '@/models/Lead';

export const dynamic = 'force-dynamic';

export default async function LeadsAdminPage() {
    // Server-side auth gate
    const has = cookies().get('admin_session')?.value;
    if (!has) redirect('/admin/login');

    // DB query on server
    await dbConnect();
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();

    return (
        <LeadsClient leads={JSON.parse(JSON.stringify(leads))} />
    );
}

import LeadsClient from './LeadsClient';
