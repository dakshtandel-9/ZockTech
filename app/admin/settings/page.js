import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import SettingsClient from './SettingsClient';

export const metadata = {
    title: 'Admin Settings | ZockTech',
};

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const has = cookieStore.get('admin_session')?.value;
    if (!has) redirect('/admin/login');

    return <SettingsClient />;
}
