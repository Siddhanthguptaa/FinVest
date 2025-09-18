// src/components/landing/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 text-gray-600">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Finvest</h2>
                        <p className="text-sm">Intelligent Investing, Simplified.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Products</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-blue-600">Stocks</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">ETFs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-blue-600">Support</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Finvest Inc. All rights reserved.</p>
                    <p className="mt-2 text-xs">This is a fictional website for demonstration purposes.</p>
                </div>
            </div>
        </footer>
    );
}