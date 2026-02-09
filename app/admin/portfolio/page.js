import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import PortfolioClient from './PortfolioClient';

export const metadata = {
    title: 'Portfolio Management | ZockTech Admin',
};

export default async function PortfolioAdminPage() {
    const cookieStore = await cookies();
    const has = cookieStore.get('admin_session')?.value;
    if (!has) redirect('/admin/login');

    return <PortfolioClient />;
}
