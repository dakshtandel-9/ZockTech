// components/ContactSection.jsx
'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ ok: null, msg: '' });

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setLoading(false);
      return;
    }

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Submit failed');

      setStatus({ ok: true, msg: 'Submitted! We will contact you shortly.' });
      form.reset();
    } catch (err) {
      setStatus({ ok: false, msg: err?.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">
            Get a free quote
          </span>
          <h2 className="mt-3 text-3xl font-semibold">Tell us about the project</h2>
          <p className="mt-2 text-base text-gray-400">Share goals, timeline, and budget. We reply fast.</p>
          <ul className="mt-6 space-y-2 text-base text-gray-300">
            <li>- Conversion‑focused design</li>
            <li>- SEO foundations and analytics</li>
            <li>- Post‑launch support</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="rounded-lg border border-white/5 bg-[#111116] p-6 space-y-4" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-base text-gray-300">Name</label>
              <input
                name="name"
                required
                placeholder="John Doe"
                className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
              />
            </div>
            <div>
              <label className="block text-base text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@mail.com"
                className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-base text-gray-300">Phone</label>
              <input
                name="phone"
                required
                pattern="^[0-9+\-\s()]{7,}$"
                title="Please enter a valid phone number"
                placeholder="+91 98765 43210"
                className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
              />
            </div>
            <div>
              <label className="block text-base text-gray-300">Website (optional)</label>
              <input
                name="website"
                type="url"
                pattern="^https?://.+"
                title="Include http:// or https://"
                placeholder="https://example.com"
                className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-base text-gray-300">Project Type</label>
              <select
                name="projectType"
                required
                className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
              >
                <option value="">Select…</option>
                <option>WordPress</option>
                <option>Shopify</option>
                <option>Custom (MERN/Next.js)</option>
                <option>Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-base text-gray-300">Timeline</label>
              <select
                name="timeline"
                required
                className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
              >
                <option>Urgent (≤2 weeks)</option>
                <option>2–4 weeks</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-base text-gray-300">Budget</label>
            <select
              name="budget"
              required
              className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
            >
              <option value="">Select…</option>
              <option>₹5k–₹25k</option>
              <option>₹25k–₹75k</option>
              <option>₹75k+</option>
            </select>
          </div>

          <div>
            <label className="block text-base text-gray-300">Project Details</label>
            <textarea
              name="message"
              rows={4}
              required
              minLength={10}
              placeholder="Goals, pages, features…"
              className="mt-1 w-full rounded-md border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/50"
            />
          </div>

          <input type="hidden" name="source" value="website" />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[5px] bg-[#FF7302] px-4 py-3 text-base font-semibold text-black hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Submitting…' : 'Submit'}
          </button>

          {status.ok === true && <p className="text-base text-green-400">✅ {status.msg}</p>}
          {status.ok === false && <p className="text-base text-red-400">❌ {status.msg}</p>}
        </form>
      </div>
    </section>
  );
}
