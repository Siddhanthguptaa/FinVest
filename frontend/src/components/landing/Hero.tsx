// src/components/landing/Hero.tsx
'use client';
import Link from 'next/link';
import MarketTicker from './MarketTicker'; 

// SVG Icons
const ArrowRight = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const GoogleIcon = () => (<svg className="w-5 h-5 mr-3" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.438 36.338 48 30.692 48 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>);

export default function Hero({ onInsightClick }: { onInsightClick: (title: string, prompt: string | null, mode: string) => void }) {
  return (
    <section className="relative h-screen flex items-center justify-center text-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-indigo-100/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/60 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/60 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>
      <div className="container mx-auto px-6 text-center z-20">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
          Intelligent Investing, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">Simplified for You.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Unlock your financial potential with our AI-powered platform. Make smarter decisions, track your portfolio, and grow your wealth with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
            Get Started Free <ArrowRight className="w-5 h-5 ml-2"/>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 w-full z-20">
        <MarketTicker onInsightClick={onInsightClick} />
      </div>
    </section>
  );
}