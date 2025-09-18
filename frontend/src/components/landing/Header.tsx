// src/components/landing/Header.tsx
'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-30 bg-transparent text-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">Finvest</h1>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="hover:text-blue-600 transition-colors duration-300">Features</Link>
          <Link href="#ai-insights" className="hover:text-blue-600 transition-colors duration-300">AI Insights</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm hover:text-blue-600 transition-colors duration-300">Log In</Link>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}