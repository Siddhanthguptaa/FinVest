// src/app/dashboard/layout.tsx
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    if (isAuthLoading || !user) {
        return <div className="flex h-screen items-center justify-center bg-base-200">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-base-200 font-sans text-sm text-content-primary">
            <DashboardHeader user={user} />
            <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Page-specific content will be rendered here */}
                {children}
            </main>
        </div>
    );
}