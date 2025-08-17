'use client';

import { useMemo, useState } from 'react';

export default function LeadsClient({ leads }) {
    // UI state
    const [query, setQuery] = useState('');
    const [type, setType] = useState('All');
    const [budget, setBudget] = useState('All');
    const [timeline, setTimeline] = useState('All');
    const [sort, setSort] = useState('createdAt-desc');
    const [page, setPage] = useState(1);
    const [fromDate, setFromDate] = useState(''); // yyyy-mm-dd
    const [toDate, setToDate] = useState('');     // yyyy-mm-dd

    const PAGE_SIZE = 10;

    // Derive filter options
    const types = useMemo(() => ['All', ...unique(leads.map(l => l.projectType).filter(Boolean))], [leads]);
    const budgets = useMemo(() => ['All', ...unique(leads.map(l => l.budget).filter(Boolean))], [leads]);
    const timelines = useMemo(() => ['All', ...unique(leads.map(l => l.timeline).filter(Boolean))], [leads]);

    // Convert yyyy-mm-dd -> Date at start/end of day (local)
    function parseStart(d) {
        if (!d) return null;
        const [y, m, day] = d.split('-').map(Number);
        return new Date(y, (m || 1) - 1, day || 1, 0, 0, 0, 0);
    }
    function parseEnd(d) {
        if (!d) return null;
        const [y, m, day] = d.split('-').map(Number);
        return new Date(y, (m || 1) - 1, day || 1, 23, 59, 59, 999);
    }

    // Filter + search + date range
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const start = parseStart(fromDate);
        const end = parseEnd(toDate);

        return leads.filter(l => {
            // Date window check
            const created = new Date(l.createdAt);
            if (start && created < start) return false;
            if (end && created > end) return false;

            // Select filters
            const matchType = type === 'All' || (l.projectType || '') === type;
            const matchBudget = budget === 'All' || (l.budget || '') === budget;
            const matchTimeline = timeline === 'All' || (l.timeline || '') === timeline;

            // Text search
            const blob = [
                l.name, l.email, l.phone, l.projectType, l.budget, l.timeline, l.message,
                created.toLocaleString(),
            ].filter(Boolean).join(' ').toLowerCase();
            const matchText = !q || blob.includes(q);

            return matchType && matchBudget && matchTimeline && matchText;
        });
    }, [leads, type, budget, timeline, query, fromDate, toDate]);

    // Sort
    const sorted = useMemo(() => {
        const [key, dir] = sort.split('-');
        const mul = dir === 'asc' ? 1 : -1;
        return [...filtered].sort((a, b) => {
            if (key === 'createdAt') return (new Date(a.createdAt) - new Date(b.createdAt)) * mul;
            if (key === 'name') return String(a.name || '').localeCompare(String(b.name || '')) * mul;
            return 0;
        });
    }, [filtered, sort]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const pageItems = sorted.slice(startIdx, startIdx + PAGE_SIZE);

    // Reset to page 1 when filters/search change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => setPage(1), [query, type, budget, timeline, sort, fromDate, toDate]);

    return (
        <main className="mx-auto max-w-7xl px-4 py-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold">Leads</h1>
                    <p className="mt-2 text-base text-gray-400">
                        {sorted.length} result{sorted.length !== 1 ? 's' : ''} • Filter by date, type, budget, timeline
                    </p>
                </div>
               
            </div>

            {/* Controls */}
            <div className="mt-6 grid gap-3 md:grid-cols-8">
                {/* Search */}
                <div className="md:col-span-3">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search name, email, phone, message..."
                        className="w-full rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                    />
                </div>

                {/* Date range */}
                <div className="flex items-center gap-2 md:col-span-3">
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-400">From</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="mb-1 block text-xs text-gray-400">To</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                        />
                    </div>
                    {/* Quick clear */}
                    <button
                        type="button"
                        onClick={() => { setFromDate(''); setToDate(''); }}
                        className="mt-6 h-[42px] rounded-[5px] border border-white/15 px-3 text-base hover:bg-white/5"
                        title="Clear dates"
                    >
                        Clear
                    </button>
                </div>

                {/* Select filters */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                >
                    {types.map((t) => <option key={t}>{t}</option>)}
                </select>
                <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                >
                    {budgets.map((b) => <option key={b}>{b}</option>)}
                </select>
                <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                >
                    {timelines.map((t) => <option key={t}>{t}</option>)}
                </select>

                {/* Sort */}
                <div className="md:col-span-2">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="w-full rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                    >
                        <option value="createdAt-desc">Newest first</option>
                        <option value="createdAt-asc">Oldest first</option>
                        <option value="name-asc">Name A→Z</option>
                        <option value="name-desc">Name Z→A</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto rounded-lg border border-white/5">
                <table className="min-w-full text-left text-base">
                    <thead className="bg-white/5 text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Created</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Budget</th>
                            <th className="px-4 py-3">Timeline</th>
                            <th className="px-4 py-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageItems.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                                    No leads found. Adjust filters, dates, or search.
                                </td>
                            </tr>
                        ) : (
                            pageItems.map((l) => (
                                <tr key={l._id} className="border-t border-white/5 align-top">
                                    <td className="px-4 py-3 text-gray-400">{new Date(l.createdAt).toLocaleString()}</td>
                                    <td className="px-4 py-3">{l.name}</td>
                                    <td className="px-4 py-3">{l.phone}</td>
                                    <td className="px-4 py-3">{l.email}</td>
                                    <td className="px-4 py-3 text-gray-400">{l.projectType}</td>
                                    <td className="px-4 py-3 text-gray-400">{l.budget}</td>
                                    <td className="px-4 py-3 text-gray-400">{l.timeline}</td>
                                    <td className="px-4 py-3 text-gray-400 max-w-[420px]">
                                        <span title={l.message} className="line-clamp-3">{l.message}</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                    Page {currentPage}/{totalPages} • Showing {pageItems.length} of {sorted.length}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-[5px] border border-white/15 px-3 py-2 text-base hover:bg-white/5 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-[5px] border border-white/15 px-3 py-2 text-base hover:bg-white/5 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
    );
}

function unique(arr) {
    return Array.from(new Set(arr));
}
