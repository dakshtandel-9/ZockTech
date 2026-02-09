'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsClient() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: password }),
            });

            const data = await res.json();

            if (data.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully!' });
                setPassword('');
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update password' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto max-w-2xl px-4 text-white py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold">Admin Settings</h1>
                    <p className="mt-2 text-gray-400">Manage your administrative preferences</p>
                </div>
                <Link
                    href="/admin/leads"
                    className="rounded-[5px] border border-white/15 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                >
                    Back to Leads
                </Link>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#0B0B0F] p-6">
                <h2 className="text-xl font-medium mb-4">Change Password</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min 4 characters"
                            className="w-full rounded-[5px] border border-white/10 bg-[#060609] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                            required
                        />
                    </div>

                    {message.text && (
                        <div className={`p-3 rounded-[5px] text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-[5px] bg-[#FF7302] py-2.5 font-medium text-white transition-all hover:bg-[#FF7302]/90 disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        Note: This will override the password set in your .env file.
                    </p>
                </form>
            </div>
        </main>
    );
}
