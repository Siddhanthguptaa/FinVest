// src/app/dashboard/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import InvestModal from '@/components/dashboard/InvestModal';

export default function ProductsPage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            const fetchProducts = async () => {
                try {
                    const response = await api.get('/products');
                    setProducts(response.data);
                } catch (err) {
                    setError('Failed to fetch products.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProducts();
        }
    }, [user, isAuthLoading, router]);

    const openInvestModal = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    if (isLoading || isAuthLoading) {
        return <div>Loading products...</div>;
    }

    
    return (
        <div>
            <h2 className="text-3xl font-bold text-content-primary mb-6">Explore Investment Products</h2>
            {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-base-100 border border-base-300 rounded-lg p-6 flex flex-col">
                        <h3 className="text-xl font-bold text-content-primary">{product.name}</h3>
                        <p className="text-sm text-content-secondary capitalize mt-1">{product.investmentType}</p>
                        <div className="my-4 space-y-2">
                            <div className="flex justify-between"><span className="text-content-secondary">Annual Yield</span><span className="font-semibold text-accent-positive">{product.annualYield}%</span></div>
                            <div className="flex justify-between"><span className="text-content-secondary">Risk Level</span><span className="font-semibold capitalize">{product.riskLevel}</span></div>
                            <div className="flex justify-between"><span className="text-content-secondary">Tenure</span><span className="font-semibold">{product.tenureMonths} months</span></div>
                            <div className="flex justify-between"><span className="text-content-secondary">Min. Investment</span><span className="font-semibold">${Number(product.minInvestment).toLocaleString()}</span></div>
                        </div>
                        <button onClick={() => openInvestModal(product)} className="mt-auto w-full px-4 py-2 font-semibold text-white bg-brand-primary rounded-md hover:bg-blue-700">
                            Invest Now
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedProduct && (
                <InvestModal 
                    product={selectedProduct} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
}