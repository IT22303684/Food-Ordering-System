// src/pages/CardDetails.tsx
import React from 'react';
import { Card, CardContent } from '@/components/UI/card';
import { Button } from '@/components/UI/Button';

const CardDetails = () => {
    return (
        <Card className="p-4">
            <h2 className="text-lg font-bold mb-4">Enter Card Details</h2>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Card Number</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="1234 5678 9012 3456"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Expiration Date</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">CVV</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded-md"
                        placeholder="123"
                    />
                </div>
            </div>
            <Button className="mt-4 w-full bg-green-500">Submit Payment</Button>
        </Card>
    );
};

export default CardDetails;
