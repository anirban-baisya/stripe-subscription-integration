import { useState } from 'react';
import { createSubscriptionSession } from './services/stripeService';

//to get priceId from Stripe Dashboard > Product catalog > Create product (fill Name, Desc, price, etc.) > Get priceId
const plans = [
    {
        name: 'Basic Plan',
        price: '$5',
        priceId: 'price_1T0RMoR2xNl1jEm41n7g5hXb', // Get this from Stripe Dashboard and the priceId will start from "price_ ..."
        features: [
            'Basic features access',
            '5 projects per month',
            'Community support',
            'Weekly updates'
        ]
    },
    {
        name: 'Premium Plan',
        price: '$15',
        priceId: 'price_1T0RNgR2xNl1jEm4mWyMm8Lb', // Get this from Stripe Dashboard
        features: [
            'All Basic features',
            'Unlimited projects',
            'Priority support',
            'Daily updates',
            'Advanced analytics'
        ]
    }
];

function App() {
  const [loading, setLoading] = useState<string | null>(null); // Track which button is loading

    const handleSubscribe = async (priceId: string) => {
        setLoading(priceId);
        try {
            const data = await createSubscriptionSession(priceId);
            if (data.url) {
                window.location.assign(data.url);
            }
        } catch (err) {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Choose Your Plan</h1>
                <p className="text-gray-500 text-lg">Simple pricing for everyone</p>
            </div>

            {/* Plans Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{plan.name}</h2>
                        
                        <div className="flex items-baseline mb-8">
                            <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                            <span className="text-gray-400 ml-1 text-sm">/month</span>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Action Button */}
                        <button
                            disabled={loading === plan.priceId}
                            onClick={() => handleSubscribe(plan.priceId)}
                            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
                        >
                            {loading === plan.priceId ? "Processing..." : "Subscribe Now"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App
