// app/admin/login/page.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const [show, setShow] = useState(false);

    let hasError = false;
    if (typeof window !== 'undefined') {
        const u = new URL(window.location.href);
        hasError = u.searchParams.get('error') != null;
    }

    return (
        <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
            <div className="text-center">
                <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">
                    Admin Area
                </span>
                <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>
                <p className="mt-2 text-base text-gray-400">Enter the admin password to continue.</p>
            </div>

            <div className="mx-auto mt-8 w-full rounded-lg border border-white/5 bg-[#111116] p-6 shadow-sm">
                {hasError && (
                    <div className="mb-4 rounded-[5px] border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                        Incorrect password. Please try again.
                    </div>
                )}

                <form action="/admin/login/submit" method="post" className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-base text-gray-300">Password</label>
                        <div className="mt-1 flex rounded-md border border-white/10 bg-[#0B0B0F] focus-within:ring-2 focus-within:ring-[#FF7302]/40">
                            <input
                                id="password" type={show ? 'text' : 'password'} name="password" required autoFocus
                                className="w-full rounded-l-md bg-transparent px-3 py-2 text-base text-white placeholder-gray-500 outline-none"
                                placeholder="••••••••" aria-label="Admin password"
                            />
                            <button type="button" onClick={() => setShow(s => !s)}
                                className="rounded-r-md px-3 text-sm text-gray-300 hover:bg-white/5"
                                aria-label={show ? 'Hide password' : 'Show password'}>
                                {show ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full rounded-[5px] bg-[#FF7302] px-4 py-3 text-base font-semibold text-black hover:opacity-90">
                        Sign in
                    </button>
                </form>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>Protected portal</span>
                    <Link href="/" className="text-gray-300 hover:text-white">Back to site</Link>
                </div>
            </div>

            <p className="mx-auto mt-4 max-w-md text-center text-sm text-gray-500">
                Cookie-based session. Close the browser or use Logout in admin to end your session.
            </p>
        </main>
    );
}
