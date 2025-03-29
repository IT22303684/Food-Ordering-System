// CardDetails.tsx
import React, { useState } from 'react';
import { Button } from '@/components/UI/Button';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate from react-router-dom

const CardDetails = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleSubmit = () => {
        console.log("Card details submitted:", { cardNumber, expiryDate, cvv });
        // Redirect to order confirmation page after submitting card details
        navigate("/order-confirmation");  // Use navigate for routing
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Enter Card Details</h2>
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter your card number"
                />

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="CVV"
                        />
                    </div>
                </div>
            </div>

            <Button
                className="mt-6 w-full bg-green-500"
                onClick={handleSubmit}
            >
                Confirm Payment
            </Button>
        </div>
    );
};

export default CardDetails;
