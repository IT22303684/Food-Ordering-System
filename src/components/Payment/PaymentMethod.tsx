// PaymentMethod.tsx
import React from 'react';
import { Card, CardContent } from '@/components/UI/card';
import { Button } from '@/components/UI/Button';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';

const PaymentMethod = () => {
    return (
        <Card className="p-4">
            <h2 className="text-lg font-bold mb-4">PAYMENT METHOD</h2>
            <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input type="radio" name="payment" /> Cash
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="payment" /> Card at pickup counter
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="payment" /> Call me back and I'll tell you my card details
                </label>
                <div className="border border-blue-500 rounded-lg p-2 bg-blue-50">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" checked /> Pay online
                    </label>
                    <div className="flex gap-2 mt-2 text-2xl">
                        <FaCcVisa className="text-blue-600" />
                        <FaCcMastercard className="text-red-600" />
                        <FaCcAmex className="text-blue-500" />
                        <FaCcDiscover className="text-orange-500" />
                    </div>
                </div>
                <label className="flex items-center gap-2">
                    <input type="radio" name="payment" /> PayPal
                </label>
            </div>
            <Button className="mt-4 w-full bg-orange-500">Save</Button>
        </Card>
    );
};

export default PaymentMethod;
