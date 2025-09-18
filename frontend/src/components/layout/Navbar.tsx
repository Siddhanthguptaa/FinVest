// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'; 

export default function Navbar() {
    const pathname = usePathname(); 
    const { user } = useAuth();
    const router = useRouter();

    if (pathname.startsWith('/dashboard')) {
        return null;
    }

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-indigo-600">
                            Finvest
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                                <button onClick={() => router.push('/dashboard')} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                    Go to Dashboard
                                </button>
                        ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-gray-50 border">
                                    Login
                                </Link>
                                <Link href="/signup" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}