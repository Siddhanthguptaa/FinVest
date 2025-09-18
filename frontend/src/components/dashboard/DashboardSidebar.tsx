// src/components/dashboard/DashboardSidebar.tsx
'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// This is the full Card component implementation
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-base-100 border border-base-300 rounded-md p-4 ${className}`}>
        {children}
    </div>
);

export const DashboardSidebar: React.FC<{ portfolio: any }> = ({ portfolio }) => {
    
    // Prepare data for the donut chart
    const investmentTypes = portfolio?.investments?.reduce((acc: any, inv: any) => {
        const type = inv.product.investmentType;
        const amount = Number(inv.amount);
        if (!acc[type]) {
            acc[type] = 0;
        }
        acc[type] += amount;
        return acc;
    }, {});

    const chartData = investmentTypes ? Object.keys(investmentTypes).map(key => ({
        name: key.toUpperCase(),
        value: investmentTypes[key]
    })) : [];

    const COLORS = ['#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50'];

    return (
        <div className="space-y-4">
            <Card>
                <h3 className="text-content-secondary">Unrealized P&L</h3>
                <div className="flex items-baseline space-x-2 mt-2">
                    <p className="text-2xl font-light text-content-primary">
                        ${portfolio?.totalExpectedReturn?.toLocaleString() || '0.00'}
                    </p>
                    {portfolio?.totalInvested > 0 &&
                        <p className="text-sm text-accent-positive">
                            ▲ {((portfolio?.totalExpectedReturn / portfolio?.totalInvested) * 100).toFixed(2)}%
                        </p>
                    }
                </div>
            </Card>
            <Card>
                <h3 className="text-content-secondary mb-4 text-center">Portfolio Allocation</h3>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                            <Legend iconSize={10} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};