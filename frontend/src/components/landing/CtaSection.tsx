// src/components/landing/CtaSection.tsx
import Link from 'next/link';

export default function CtaSection() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-10 md:p-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">Join thousands of investors building their future with Finvest. Create your account in minutes.</p>
                    <Link href="/signup" className="bg-white hover:bg-gray-200 text-blue-700 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                        Open an Account Now
                    </Link>
                </div>
            </div>
        </section>
    );
}