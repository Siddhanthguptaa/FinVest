// src/components/dashboard/DashboardHeader.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// --- Full SVG Icon Code ---
const BellIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg> );
const ShoppingCartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg> );
const BrandLogo = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4.5L8 12L16 19.5" stroke="#F97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg> );
// --- End of SVG Icons ---

const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Products', href: '/dashboard/products' },
    { name: 'AI Insights', href: '/dashboard/ai-insights' },
];

export const DashboardHeader: React.FC<{ user: any }> = ({ user }) => {
    const pathname = usePathname();
    const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'U';
    const userName = user?.email?.split('@')[0] || 'User';

    return (
        <header className="sticky top-0 z-10 shadow-sm">
            <div className="bg-slate-800">
                <div className="max-w-screen-2xl mx-auto px-4 h-8 flex items-center text-xs text-gray-300 space-x-6 overflow-x-auto">
                    {/* Ticker data */}
                    <div className="flex items-center space-x-2 flex-shrink-0"><span className="font-medium text-white">NIFTY 50</span><span className="text-accent-positive">23,557.90</span><span className="text-gray-400">+189.20 (0.81%)</span></div>
                    <div className="flex items-center space-x-2 flex-shrink-0"><span className="font-medium text-white">SENSEX</span><span className="text-accent-positive">77,394.12</span><span className="text-gray-400">+412.80 (0.54%)</span></div>
                    <div className="flex items-center space-x-2 flex-shrink-0"><span className="font-medium text-white">NASDAQ</span><span className="text-accent-positive">17,922.31</span><span className="text-gray-400">+59.12 (0.33%)</span></div>
                    <div className="flex items-center space-x-2 flex-shrink-0"><span className="font-medium text-white">DOW FUTURES</span><span className="text-accent-negative">39,450.50</span><span className="text-gray-400">-25.50 (0.06%)</span></div>
                    <div className="flex items-center space-x-2 flex-shrink-0"><span className="font-medium text-white">BITCOIN</span><span className="text-accent-positive">$66,123.45</span><span className="text-gray-400">+$850.11 (1.30%)</span></div>
                    <div className="flex items-center space-x-2 flex-shrink-0"><span className="font-medium text-white">ETHEREUM</span><span className="text-accent-negative">$3,515.20</span><span className="text-gray-400">-$45.30 (1.27%)</span></div>
                </div>
            </div>
            <div className="bg-base-100 border-b border-base-300">
                <div className="max-w-screen-2xl mx-auto px-2 sm:px-4">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex-shrink-0"><BrandLogo /></div>
                        <div className="flex-1 flex justify-center">
                            
                            <nav className="flex items-center space-x-4 md:space-x-8 text-sm">
                                {navLinks.map(link => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`transition-colors py-4 whitespace-nowrap ${
                                            pathname === link.href 
                                            ? 'text-brand-accent font-medium border-b-2 border-brand-accent' 
                                            : 'text-content-secondary hover:text-content-primary'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-4">
                            <button className="text-content-secondary hover:text-content-primary p-1"><ShoppingCartIcon /></button>
                            <button className="text-content-secondary hover:text-content-primary p-1"><BellIcon /></button>
                            <div className="w-px h-6 bg-base-300"></div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">{userInitials}</div>
                                <span className="text-sm text-content-secondary hidden sm:block">{userName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};