const PaymentSummary = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="flex justify-between border-b pb-2 mb-2"><span>Item 1</span><span>$10.00</span></p>
        <p className="flex justify-between border-b pb-2 mb-2"><span>Item 2</span><span>$15.00</span></p>
        <p className="flex justify-between font-semibold"><span>Total</span><span>$25.00</span></p>
      </div>
    </div>
  );
};

export default PaymentSummary;