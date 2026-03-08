import { useAuthContext } from '@/context/AuthContext';
import api from '@/lib/api';
import { useState } from 'react';

export const useSubscription = () => {
    const { user, refreshUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upgradePlan = async (planId: string) => {
        setLoading(true);
        setError(null);
        try {
            // For real Razorpay, you would first create an order on the backend here:
            // const order = await api.post('/api/v1/subscriptions/create-order', { plan_id: planId });

            // Mocking Razorpay flow structure
            const res = await new Promise((resolve) => {
                const options = {
                    key: 'rzp_test_mock_key', // Replace with NEXT_PUBLIC_RAZORPAY_KEY
                    amount: planId === 'pro' ? 89900 : planId === 'medical_pro' ? 249900 : 29900,
                    currency: 'INR',
                    name: 'Medic24 AI',
                    description: `Upgrade to ${planId} plan`,
                    // order_id: order.data.order_id,
                    handler: async function (response: any) {
                        try {
                            // On payment success, tell backend to update postgres
                            await api.post('/auth/upgrade', {
                                plan: planId,
                                payment_id: response.razorpay_payment_id
                            });
                            resolve(true);
                        } catch (err) {
                            console.error("Upgrade failed:", err);
                            resolve(false);
                        }
                    },
                    prefill: {
                        name: user?.name || '',
                        email: user?.email || '',
                    },
                    theme: {
                        color: '#0EA5E9'
                    }
                };

                // If real razorpay is loaded
                if ((window as any).Razorpay) {
                    const rzp = new (window as any).Razorpay(options);
                    rzp.on('payment.failed', function (response: any) {
                        console.error('Payment Failed:', response.error);
                        resolve(false);
                    });
                    rzp.open();
                } else {
                    // Fallback dummy success simulating checking out
                    console.warn("Razorpay script not loaded, simulating success...");
                    setTimeout(async () => {
                        try {
                            await api.post('/auth/upgrade', { plan: planId });
                            resolve(true);
                        } catch {
                            resolve(false);
                        }
                    }, 1500);
                }
            });

            if (res) {
                await refreshUser();
                return true;
            } else {
                setError("Payment was cancelled or failed.");
                return false;
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during checkout');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { upgradePlan, loading, error };
};
