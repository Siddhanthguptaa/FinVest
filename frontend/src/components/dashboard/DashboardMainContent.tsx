// src/components/dashboard/DashboardMainContent.tsx
'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-base-100 border border-base-300 rounded-md p-4 ${className}`}>{children}</div>
);

export const DashboardMainContent: React.FC<{ user: any, portfolio: any }> = ({ user, portfolio }) => {
    // Prepare data for the holdings chart
    const chartData = portfolio?.investments?.map((inv: any) => ({
        name: inv.product.name.substring(0, 15) + (inv.product.name.length > 15 ? '...' : ''),
        Amount: Number(inv.amount),
    })) || [];

    return (
        <div className="space-y-4">
            <h1 className="text-2xl text-content-primary">Hi, {user?.firstName || user?.email.split('@')[0]}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <h3 className="text-content-secondary">Total Invested</h3>
                    <p className="text-3xl font-light mt-2">${portfolio?.totalInvested?.toLocaleString() || '0.00'}</p>
                    <p className="text-xs text-content-secondary mt-2">Current portfolio value</p>
                </Card>
                <Card>
                    <h3 className="text-content-secondary">Total Expected Returns</h3>
                    <p className="text-3xl font-light mt-2 text-accent-positive">${portfolio?.totalExpectedReturn?.toLocaleString() || '0.00'}</p>
                     <p className="text-xs text-content-secondary mt-2">Based on current holdings</p>
                </Card>
            </div>

            <Card>
                <h3 className="text-content-secondary">Holdings ({portfolio?.investmentsCount || 0})</h3>
                <div className="mt-4" style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={10} interval={0} angle={-20} textAnchor="end" height={50} />
                            <YAxis fontSize={10} />
                            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                            <Bar dataKey="Amount" fill="#387ed1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};