// src/components/dashboard/InvestModal.tsx
'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function InvestModal({ product, onClose }: { product: any, onClose: () => void }) {
    const [amount, setAmount] = useState(product.minInvestment);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/investments', {
                productId: product.id,
                amount: Number(amount)
            });
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Investment failed. Please try again.');
        }
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
                    <p>Your investment of ${Number(amount).toLocaleString()} in {product.name} was successful.</p>
                    <button onClick={onClose} className="mt-6 w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Close
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Invest in {product.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Amount to Invest</label>
                        <input 
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={product.minInvestment}
                            max={product.maxInvestment || undefined}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                            required 
                        />
                        <p className="text-xs text-gray-500 mt-1">Min: ${Number(product.minInvestment).toLocaleString()}</p>
                    </div>
                    {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 font-semibold text-white bg-brand-primary rounded-md hover:bg-blue-700">
                            Confirm Investment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}