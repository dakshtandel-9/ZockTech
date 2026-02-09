// app/admin/leads/page.js
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import LeadsClient from './LeadsClient';

export const dynamic = 'force-dynamic';

export default async function LeadsAdminPage() {
    const cookieStore = await cookies();
    const has = cookieStore.get('admin_session')?.value;
    if (!has) redirect('/admin/login');

    let leads = [];
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('id, name, email, phone, project_type, budget, timeline, message, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map created_at to createdAt for compatibility with LeadsClient if needed
        // Map project_type to projectType if needed
        leads = (data || []).map(lead => ({
            ...lead,
            _id: lead.id,
            createdAt: lead.created_at,
            projectType: lead.project_type
        }));
    } catch (e) {
        console.error('Supabase fetch error:', e instanceof Error ? e.stack || e.message : JSON.stringify(e));
    }

    return <LeadsClient leads={JSON.parse(JSON.stringify(leads))} />;
}
