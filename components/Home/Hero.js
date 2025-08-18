export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 text-center">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-base text-gray-300">
                    Premium • Fast • High‑Converting
                </span>
                <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-white">
                    Premium Websites That Win Customers—Without Breaking the Budget
                </h1>
                <p className="mt-4 text-base text-gray-300 max-w-2xl mx-auto">
                    WordPress, Shopify, and Custom/MERN builds for growing small businesses. Launch fast, look modern, and convert more.
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <a href="#contact" className="rounded-md bg-[#FF7302] px-6 py-3 font-semibold text-black hover:opacity-90">
                        Get a Free Quote
                    </a>
                    <a href="#portfolio" className="rounded-md border border-white/10 px-6 py-3 font-semibold text-white hover:bg-white/5">
                        View Portfolio
                    </a>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(255,115,2,0.15),transparent_60%)]" />
        </section>
    );
}
