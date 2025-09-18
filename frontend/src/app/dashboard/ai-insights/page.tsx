// src/app/dashboard/ai-insights/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function AiInsightsPage() {
    const { user } = useAuth();
    const [portfolio, setPortfolio] = useState(null);
    const [products, setProducts] = useState<any[]>([]); // To get the list of products for suggestions

    // State for Portfolio Review
    const [review, setReview] = useState('');
    const [isReviewLoading, setIsReviewLoading] = useState(false);

    // State for Product Suggestions
    const [suggestion, setSuggestion] = useState('');
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);

    useEffect(() => {
        // We need both portfolio and products data for our AI features
        if (user) {
            const fetchData = async () => {
                try {
                    const [portfolioRes, productsRes] = await Promise.all([
                        api.get('/investments/portfolio'),
                        api.get('/products')
                    ]);
                    setPortfolio(portfolioRes.data);
                    setProducts(productsRes.data);
                } catch (error) {
                    console.error("Failed to fetch dashboard data", error);
                }
            };
            fetchData();
        }
    }, [user]);

    const getPortfolioReview = async () => {
        // ... (The getPortfolioReview function is the same as before)
    };

    const getAiSuggestion = async () => {
        setIsSuggestionLoading(true);
        setSuggestion('');

        // Note: The full user profile with riskAppetite is not in our AuthContext.
        // For this project, we will just use 'moderate' as a default.
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
                <button onClick={getPortfolioReview} disabled={isReviewLoading || !portfolio} className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
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
                <button onClick={getAiSuggestion} disabled={isSuggestionLoading || products.length === 0} className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
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