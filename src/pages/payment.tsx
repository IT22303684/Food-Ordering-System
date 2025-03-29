import PaymentForm from "../components/Payment/PaymentForm";
import PaymentSummary from "../components/Payment/PaymentSummary";

const Payment = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <PaymentSummary />
        <PaymentForm />
      </div>
    </div>
  );
};

export default Payment;