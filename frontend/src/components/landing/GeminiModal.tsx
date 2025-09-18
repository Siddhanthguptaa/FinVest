// src/components/landing/GeminiModal.tsx
'use client';
import React, { useEffect, useRef } from 'react';

// SVG Icons
const XIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const SendIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);

export default function GeminiModal({ isOpen, onClose, title, content, isLoading, mode, quizStep, quizAnswers, handleQuizAnswer, generatePortfolio, chatHistory, userChatInput, setUserChatInput, handleChatSubmit }: any) {
    if (!isOpen) return null;

    const quizQuestions = [
  { 
    id: 'age', 
    text: 'What is your approximate age?', 
    options: ['Under 25', '25-35', '36-50', '51+'] 
  },
  { 
    id: 'horizon', 
    text: 'What is your investment horizon?', 
    options: ['Short-term (1-3 years)', 'Medium-term (3-7 years)', 'Long-term (7+ years)'] 
  },
  { 
    id: 'risk', 
    text: 'How would you describe your risk tolerance?', 
    options: ['Conservative (Low Risk)', 'Moderate (Balanced Risk)', 'Aggressive (High Risk)'] 
  },
  { 
    id: 'goals', 
    text: 'What is your primary investment goal?', 
    options: ['Wealth Growth', 'Stable Income', 'Retirement Planning', 'Capital Preservation'] 
  },
  { 
    id: 'liquidity', 
    text: 'How important is liquidity (ability to quickly access your money)?', 
    options: ['Very Important', 'Somewhat Important', 'Not Important'] 
  },
  { 
    id: 'knowledge', 
    text: 'How would you rate your investment knowledge?', 
    options: ['Beginner', 'Intermediate', 'Advanced'] 
  },
  { 
    id: 'income', 
    text: 'What is your approximate annual income range?', 
    options: ['Below $25,000', '$25,000 - $75,000', '$75,000 - $150,000', '$150,000+'] 
  },
  { 
    id: 'allocation', 
    text: 'Which type of assets do you feel most comfortable holding?', 
    options: ['Stocks/ETFs', 'Bonds/Fixed Income', 'Real Estate/REITs', 'Cryptocurrency/Alternatives'] 
  },
  { 
    id: 'volatility', 
    text: 'How would you react if your portfolio dropped 15% in a short time?', 
    options: ['Sell immediately to avoid further losses', 'Hold and wait for recovery', 'Buy more at the lower price'] 
  },
  { 
    id: 'contribution', 
    text: 'How often do you plan to add funds to your investments?', 
    options: ['Monthly', 'Quarterly', 'Annually', 'Rarely/Never'] 
  }
];

    
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600">Generating your insight...</p>
                </div>
            );
        }

        switch (mode) {
            case 'portfolio-quiz':
                const currentQuestion = quizQuestions[quizStep];
                if (!currentQuestion) {
                    return (
                       <div className="text-center p-8">
                            <h3 className="text-xl font-semibold mb-4 text-slate-800">Ready to generate your portfolio?</h3>
                            <p className="text-gray-600 mb-6">Based on your answers, we will create a personalized investment strategy suggestion.</p>
                            <button onClick={generatePortfolio} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                                Generate My Strategy
                            </button>
                        </div>
                    );
                }
                return (
                    <div>
                        <h4 className="text-lg font-semibold text-center mb-6 text-slate-700">{currentQuestion.text}</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {currentQuestion.options.map(option => (
                                <button key={option} onClick={() => handleQuizAnswer(currentQuestion.id, option)}
                                    className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'chatbot':
                return (
                   <div className="flex flex-col h-[60vh]">
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {chatHistory.map((chat: any, index: number) => (
                                <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 ${chat.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-slate-800'}`}>
                                        <p className="text-sm">{chat.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <form onSubmit={handleChatSubmit} className="flex items-center space-x-3">
                                <input type="text" value={userChatInput} onChange={(e) => setUserChatInput(e.target.value)}
                                    placeholder="e.g., What is an ETF?"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button type="submit" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400" disabled={!userChatInput.trim()}>
                                    <SendIcon className="w-5 h-5"/>
                                </button>
                            </form>
                        </div>
                    </div>
                );
            default: // 'display' mode
                return <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{content}</div>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"><XIcon /></button>
                </div>
                <div className={`${mode === 'chatbot' ? 'p-0' : 'p-8'} max-h-[70vh] ${mode !== 'chatbot' ? 'overflow-y-auto' : ''}`}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};