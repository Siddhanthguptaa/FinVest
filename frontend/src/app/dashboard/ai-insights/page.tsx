// src/app/dashboard/ai-insights/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

interface PortfolioData {
    totalInvested: number;
    totalExpectedReturn: number;
    investmentsCount: number;
    investments: any[];
}

export default function AiInsightsPage() {
    const { user } = useAuth();
    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
    const [products, setProducts] = useState<any[]>([]);

    const [review, setReview] = useState('');
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const [portfolioRes, productsRes] = await Promise.all([
                        api.get('/investments/portfolio'),
                        api.get('/products')
                    ]);

                    console.log("Portfolio API Response:", portfolioRes.data);

                    // Normalize portfolio response to match PortfolioData
                    const data = portfolioRes.data;
                    const formattedPortfolio: PortfolioData = {
                        totalInvested: data.totalInvested ?? (data.investments ? data.investments.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0) : 0),
                        totalExpectedReturn: data.totalExpectedReturn ?? 0,
                        investmentsCount: data.investments ? data.investments.length : 0,
                        investments: data.investments || []
                    };

                    setPortfolio(formattedPortfolio);
                    setProducts(productsRes.data);
                } catch (error) {
                    console.error("Failed to fetch dashboard data", error);
                }
            };
            fetchData();
        }
    }, [user]);

    const getPortfolioReview = async () => {
        if (!portfolio) return;
        setIsReviewLoading(true);
        setReview('');

        const prompt = `
            Act as a professional financial advisor analyzing a user's portfolio.
            Here is the user's current investment portfolio data:
            ${JSON.stringify(portfolio, null, 2)}

            Based on this data, please provide the following, addressed directly to the user (e.g., "Your portfolio shows..."):
            1. A brief, one-paragraph summary of the portfolio's overall health and diversification.
            2. In bullet points, suggest 2-3 actionable improvements or alternative products to consider.

            Keep the entire response concise, easy to read, and encouraging.
            Do not start the first sentence with "Your Grip Invest portfolio".
        `;

        try {
            const response = await api.post('/ai/generate', { prompt });
            setReview(response.data.response || "Could not generate a review.");
        } catch (error) {
            setReview("Sorry, an error occurred while generating the review. Please try again later.");
        } finally {
            setIsReviewLoading(false);
        }
    };

    const getAiSuggestion = async () => {
        setIsSuggestionLoading(true);
        setSuggestion('');
        const userRiskAppetite = 'moderate';

        const prompt = `Act as a robo-advisor. A user with a '${userRiskAppetite}' risk appetite is looking for investment suggestions from the following list of available products:\n${JSON.stringify(products, null, 2)}\n\nBased on their risk appetite, recommend the TOP 2 products from the list. For each, provide a brief, one-sentence justification. Format the response cleanly.`;

        try {
            const response = await api.post('/ai/generate', { prompt });
            setSuggestion(response.data.response || "Could not generate a suggestion.");
        } catch (error) {
            setSuggestion("Sorry, could not generate a suggestion at this time.");
        } finally {
            setIsSuggestionLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Section 1: AI Portfolio Review */}
            <div className="bg-base-100 border border-base-300 rounded-md p-6">
                <h2 className="text-2xl font-bold text-content-primary mb-2">AI Portfolio Insights</h2>
                <p className="text-content-secondary mb-6">Analyze your current holdings and discover opportunities for growth.</p>
                <button
                    onClick={getPortfolioReview}
                    disabled={isReviewLoading || !portfolio}
                    className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {isReviewLoading ? 'Analyzing...' : '✨ Analyze My Portfolio'}
                </button>
                {review && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold text-content-primary mb-4">Your AI-Generated Review:</h3>
                        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-content-primary">{review}</div>
                    </div>
                )}
            </div>

            {/* Section 2: AI Product Suggestions */}
            <div className="bg-base-100 border border-base-300 rounded-md p-6">
                <h2 className="text-2xl font-bold text-content-primary mb-2">AI Product Suggestions</h2>
                <p className="text-content-secondary mb-6">Get personalized investment ideas based on your risk profile.</p>
                <button
                    onClick={getAiSuggestion}
                    disabled={isSuggestionLoading || products.length === 0}
                    className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {isSuggestionLoading ? 'Thinking...' : '💡 Suggest Products for Me'}
                </button>
                {suggestion && (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold text-content-primary mb-4">Your AI-Powered Suggestions:</h3>
                        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-content-primary">{suggestion}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
