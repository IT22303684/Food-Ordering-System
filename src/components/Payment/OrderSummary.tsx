// OrderSummary.tsx
import React from 'react';
import { Card, CardContent } from '@/components/UI/card';
import { Button } from '@/components/UI/Button';

const OrderSummary = () => {
    return (
        <Card className="p-4">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Cheesecake</span>
                    <span>$4.99</span>
                </div>
                <div className="flex justify-between">
                    <span>Chicken Wings (10 Wings)</span>
                    <span>$9.99</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                    <span>Subtotal</span>
                    <span>$14.98</span>
                </div>
                <div className="flex justify-between">
                    <span>Tip</span>
                    <span>$2.25</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>Total</span>
                    <span>$17.23</span>
                </div>
            </div>
            <Button className="mt-4 w-full bg-orange-500">Place Pickup Order Now</Button>
        </Card>
    );
};

export default OrderSummary;
