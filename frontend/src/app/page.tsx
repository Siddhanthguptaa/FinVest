// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import api from '@/lib/api'; // Import our central API client
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AiInsightsSection from '@/components/landing/AiInsightsSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import GeminiModal from '@/components/landing/GeminiModal';

export default function LandingPage() {
    const [modalState, setModalState] = useState({
        isOpen: false, title: '', content: '', isLoading: false, mode: 'display',
    });

    const [quizStep, setQuizStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
    const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
    const [userChatInput, setUserChatInput] = useState('');

    // --- UPDATED AI FUNCTION ---
    const fetchAiResponse = async (prompt: string, mode: string) => {
        setModalState(prev => ({ ...prev, isLoading: true, content: '' }));
        try {
            // Call our own secure backend route
            const response = await api.post('/ai/generate', { prompt });
            const text = response.data.response;

            if (!text) {
                throw new Error("No text content in AI response.");
            }

            if (mode === 'chatbot') {
                setChatHistory(prev => [...prev, { role: 'model', text }]);
            } else {
                setModalState(prev => ({ ...prev, content: text, mode: 'display' }));
            }
        } catch (error) {
            console.error("AI call failed:", error);
            const errorMessage = "Sorry, an error occurred. The AI service may be unavailable.";
            if (mode === 'chatbot') {
                setChatHistory(prev => [...prev, { role: 'model', text: errorMessage }]);
            } else {
                setModalState(prev => ({ ...prev, content: errorMessage, mode: 'display' }));
            }
        } finally {
            setModalState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleInsightClick = (title: string, prompt: string | null, mode = 'display') => {
        setModalState({ isOpen: true, title, mode, content: '', isLoading: false });

        if (mode === 'display' && prompt) {
            fetchAiResponse(prompt, mode);
        } else if (mode === 'portfolio-quiz') {
            setQuizStep(0);
            setQuizAnswers({});
        } else if (mode === 'chatbot') {
            setUserChatInput('');
            setChatHistory([{ role: 'model', text: 'Hello! What financial term can I explain for you today?' }]);
        }
    };

    const handleQuizAnswer = (questionId: string, answer: string) => {
        setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
        setQuizStep(prev => prev + 1);
    };

    const generatePortfolio = () => {
        const { age, horizon, risk } = quizAnswers;
        const prompt = `Act as an expert investment advisor. A client has provided the following details:\n- Age: ${age}\n- Investment Horizon: ${horizon}\n- Risk Tolerance: ${risk}\n\nBased on this profile, generate a diversified portfolio strategy. Provide a clear asset allocation in percentages (e.g., US Stocks: 50%, International Stocks: 20%, Bonds: 25%, Alternatives: 5%). For each asset class, provide a brief (1-2 sentence) justification and suggest one or two example ETFs. Format the response cleanly with headings.`;
        fetchAiResponse(prompt, 'portfolio-quiz');
    };

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userChatInput.trim()) return;
        const newHistory = [...chatHistory, { role: 'user', text: userChatInput }];
        setChatHistory(newHistory);
        const prompt = `Act as a friendly finance teacher. A user has asked for an explanation of a term.\nUser's question: "${userChatInput}"\nPlease explain this concept in simple, easy-to-understand language. Use an analogy if it helps. Avoid overly technical jargon.`;
        setUserChatInput('');
        fetchAiResponse(prompt, 'chatbot');
    };

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="bg-white font-sans">
            <Header />
            <main>
                <Hero onInsightClick={handleInsightClick} />
                <FeaturesSection />
                <AiInsightsSection onInsightClick={handleInsightClick} />
                <CtaSection />
            </main>
            <Footer />
            <GeminiModal 
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={modalState.title}
                content={modalState.content}
                isLoading={modalState.isLoading}
                mode={modalState.mode}
                quizStep={quizStep}
                quizAnswers={quizAnswers}
                handleQuizAnswer={handleQuizAnswer}
                generatePortfolio={generatePortfolio}
                chatHistory={chatHistory}
                userChatInput={userChatInput}
                setUserChatInput={setUserChatInput}
                handleChatSubmit={handleChatSubmit}
            />
        </div>
    );
}