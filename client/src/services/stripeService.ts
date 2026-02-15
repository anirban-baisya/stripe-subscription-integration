import apiClient from "../api/apiClient";

export const createSubscriptionSession = async (priceId: string) => {
    try {
        const response = await apiClient.post('/create-stripe-checkout-session', { priceId });
        // Return the data directly
        return response.data; 
    } catch (error: any) {
        console.error("Stripe Service Error:", error.response?.data || error.message);
        throw error; // Let the component handle the UI error
    }
};