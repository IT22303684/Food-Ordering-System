// PaymentPage.tsx
import React from 'react';
import PaymentMethod from '@/components/Payment/PaymentMethod';
import OrderSummary from '@/components/Payment/OrderSummary';

const PaymentPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <PaymentMethod />
            <OrderSummary />
        </div>
    );
};

export default PaymentPage;
