// src/pages/OrderConfirmation.tsx
import React from 'react';

const OrderConfirmation = () => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Order Confirmation</h2>
            <p>Your order has been successfully placed!</p>
            <p>Thank you for your purchase. We will notify you when your order is ready for pickup.</p>
            <button 
                className="mt-4 bg-green-500 text-white p-2 rounded-md"
                onClick={() => window.location.href = '/'}
            >
                Go Back to Home
            </button>
        </div>
    );
};

export default OrderConfirmation;
