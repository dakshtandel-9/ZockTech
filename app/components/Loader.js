"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        handleStart();
        const timer = setTimeout(() => handleComplete(), 1000);

        return () => clearTimeout(timer);
    }, [pathname]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}