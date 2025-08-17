'use client';
import { useState } from 'react';

export default function ContactSection() {
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(null); // true | false | null

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setOk(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || 'Submit failed');
            setOk(true);
            form.reset();
        } catch (err) {
            console.error(err);
            setOk(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" className="py-16">
            <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2">
                <div>
                    <h2 className="text-3xl font-semibold">Get a Free Quote</h2>
                    <p className="mt-2 text-base text-gray-400">Tell us about the project and timeline. We’ll reply fast.</p>
                    <ul className="mt-6 space-y-2 text-base text-gray-300">
                        <li>• Clear pricing and timelines</li>
                        <li>• Conversion‑focused design</li>
                        <li>• Post‑launch support</li>
                    </ul>
                </div>

                <form onSubmit={onSubmit} className="rounded-lg border border-white/5 bg-[#111116] p-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-base text-gray-300">Name</label>
                            <input name="name" required className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-base text-gray-300">Email</label>
                            <input type="email" name="email" required className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50" placeholder="john@mail.com" />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-base text-gray-300">Phone</label>
                            <input name="phone" required className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50" placeholder="+91…" />
                        </div>
                        <div>
                            <label className="block text-base text-gray-300">Website (optional)</label>
                            <input name="website" className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50" placeholder="https://example.com" />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-base text-gray-300">Project Type</label>
                            <select name="projectType" className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50">
                                <option>WordPress</option>
                                <option>Shopify</option>
                                <option>Custom (MERN/Next.js)</option>
                                <option>Maintenance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-base text-gray-300">Timeline</label>
                            <select name="timeline" className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50">
                                <option>Urgent (≤2 weeks)</option>
                                <option>2–4 weeks</option>
                                <option>Flexible</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-base text-gray-300">Budget</label>
                        <select name="budget" className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50">
                            <option>₹5k–₹25k</option>
                            <option>₹25k–₹75k</option>
                            <option>₹75k+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-base text-gray-300">Project Details</label>
                        <textarea name="message" rows="4" className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50" placeholder="Goals, pages, features..." />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-[5px] bg-[#FF7302] px-4 py-3 text-base font-semibold text-black hover:opacity-90 disabled:opacity-60"
                    >
                        {loading ? 'Submitting…' : 'Submit'}
                    </button>

                    {ok === true && <p className="text-base text-green-400">Submitted! We’ll get back shortly.</p>}
                    {ok === false && <p className="text-base text-red-400">Something went wrong. Please try again.</p>}
                </form>
            </div>
        </section>
    );
}
