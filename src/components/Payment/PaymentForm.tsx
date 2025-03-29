import { useState } from "react";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
          <span>Credit/Debit Card</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="payment" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
          <span>PayPal</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
          <span>Cash on Delivery</span>
        </label>
      </div>
      <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600">Pay Now</button>
    </div>
  );
};

export default PaymentForm;