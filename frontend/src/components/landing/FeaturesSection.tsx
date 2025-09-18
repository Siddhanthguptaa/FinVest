// src/components/landing/FeaturesSection.tsx
import React from 'react';

const ChartBarIcon = ({ className = "w-8 h-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>);
const ShieldCheckIcon = ({ className = "w-8 h-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>);
const SmartphoneIcon = ({ className = "w-8 h-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>);

const features = [
  { icon: <ChartBarIcon className="w-10 h-10 text-blue-600"/>, title: 'Advanced Analytics', description: 'Gain deep market insights with our powerful charting tools and AI-driven analysis.' },
  { icon: <ShieldCheckIcon className="w-10 h-10 text-blue-600"/>, title: 'Bank-Grade Security', description: 'Your assets and personal data are protected with multi-layered security protocols.' },
  { icon: <SmartphoneIcon className="w-10 h-10 text-blue-600"/>, title: 'Trade on the Go', description: 'Invest anytime, anywhere with our seamless and intuitive mobile application.' },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="bg-white text-slate-900 py-20 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Finvest?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">We provide the tools and technology you need to navigate the markets like a pro.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20">
                            <div className="mb-6 inline-block p-4 bg-blue-100/60 rounded-xl">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}