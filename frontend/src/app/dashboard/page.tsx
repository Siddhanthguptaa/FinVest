// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

import { DashboardWatchlist } from '@/components/dashboard/DashboardWatchlist';
import { DashboardMainContent } from '@/components/dashboard/DashboardMainContent';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

interface PortfolioData {
    totalInvested: number;
    investmentsCount: number;
    investments: any[];
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            api.get('/investments/portfolio').then(response => {
                setPortfolio(response.data);
            }).finally(() => setIsLoading(false));
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading dashboard content...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,300px)_1fr] xl:grid-cols-[minmax(250px,300px)_1fr_minmax(280px,350px)] gap-4">
            <DashboardWatchlist investments={portfolio?.investments} />
            <DashboardMainContent user={user} portfolio={portfolio} />
            <DashboardSidebar portfolio={portfolio} />
        </div>
    );
}