// src/components/dashboard/DashboardWatchlist.tsx
'use client';
import React from 'react';

const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-content-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>);

export const DashboardWatchlist: React.FC<{ investments: any[] | undefined }> = ({ investments }) => {
    return (
        <div className="bg-base-100 border border-base-300 rounded-md flex flex-col text-sm">
            <div className="p-2.5 border-b border-base-300 space-y-3">
                <div className="flex items-center border border-base-300 rounded-md p-1.5">
                    <SearchIcon />
                    <input type="text" placeholder="Search in your investments..."
                        className="flex-grow bg-transparent px-2 text-content-primary focus:outline-none placeholder-content-secondary" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="px-3 py-1.5 bg-base-200 sticky top-0">
                    <p className="text-xs font-medium text-content-secondary">My Investments ({investments?.length || 0})</p>
                </div>
                <div>
                    {investments && investments.length > 0 ? (
                        investments.map((inv) => (
                            <div key={inv.id} className="grid grid-cols-[1fr_auto] gap-4 px-3 py-2 border-b border-base-200 cursor-pointer hover:bg-base-200/50">
                                <div>
                                    <p className="font-medium text-content-primary">{inv.product.name}</p>
                                    <span className="text-xs text-content-secondary capitalize">{inv.product.investmentType}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-content-primary">${Number(inv.amount).toLocaleString()}</p>
                                    <span className={`text-xs ${inv.product.riskLevel === 'high' ? 'text-accent-negative' : 'text-accent-positive'}`}>
                                        {inv.product.riskLevel} Risk
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-center text-content-secondary">You have no investments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};