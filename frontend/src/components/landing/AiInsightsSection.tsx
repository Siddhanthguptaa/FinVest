// src/components/landing/AiInsightsSection.tsx
'use client';
import React from 'react';

const SparklesIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM16.5 4.5a.75.75 0 011.06 0l2.122 2.12a.75.75 0 01-1.061 1.061L16.5 5.56a.75.75 0 010-1.06zM21 11.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM16.5 18.5a.75.75 0 010 1.06l-2.121 2.122a.75.75 0 01-1.06-1.061l2.12-2.121a.75.75 0 011.06 0zM12 18.75a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM7.5 18.5a.75.75 0 01-1.06 0l-2.122-2.121a.75.75 0 011.061-1.06L7.5 17.44a.75.75 0 010 1.06zM3 12a.75.75 0 01-.75-.75v-3a.75.75 0 011.5 0v3A.75.75 0 013 12zM7.5 5.56a.75.75 0 010-1.06L5.379 2.379a.75.75 0 01-1.06 1.061L6.44 5.56a.75.75 0 011.06 0z" /></svg>);
const TrendingUpIcon = ({ className = "w-8 h-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>);
const BriefcaseIcon = ({ className = "w-8 h-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>);
const BookOpenIcon = ({ className = "w-8 h-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>);

const insights = [
    { title: "Market Sentiment Analysis", description: "Get an AI-generated summary of the current market mood based on news and social media.", prompt: "Act as a senior financial analyst. Provide a brief, one-paragraph analysis of the current market sentiment for US tech stocks, considering recent news and economic indicators. Focus on the overall mood (e.g., bullish, bearish, uncertain) and key driving factors.", icon: <TrendingUpIcon className="w-10 h-10 text-blue-600"/>, mode: 'display' },
    { title: "Generate a Portfolio Strategy", description: "Answer a few questions and our AI will generate a personalized portfolio strategy based on your goals.", prompt: null, icon: <BriefcaseIcon className="w-10 h-10 text-blue-600"/>, mode: 'portfolio-quiz' },
    { title: "Financial Terms Chatbot", description: "Confused by jargon? Ask our AI to explain complex financial concepts in simple, conversational terms.", prompt: null, icon: <BookOpenIcon className="w-10 h-10 text-blue-600"/>, mode: 'chatbot' }
];

export default function AiInsightsSection({ onInsightClick }: { onInsightClick: (title: string, prompt: string | null, mode: string) => void }) {
    return (
        <section id="ai-insights" className="bg-gray-50 text-slate-900 py-20 sm:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <SparklesIcon className="w-8 h-8 text-blue-500" />
                        AI-Powered Insights
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Leverage the power of generative AI to make smarter investment decisions.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                    {insights.map((insight, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 flex flex-col">
                            <div className="mb-6 inline-block p-4 bg-blue-100/60 rounded-xl w-max">{insight.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{insight.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{insight.description}</p>
                            <button onClick={() => onInsightClick(insight.title, insight.prompt, insight.mode)} className="w-full mt-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                ✨ Try Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};