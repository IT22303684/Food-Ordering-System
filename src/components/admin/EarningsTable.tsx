import React, { useState } from "react";
import ConfirmationModal from "../UI/ConfirmationModal";
import { refundPayment } from "../../utils/api";

export interface Payment {
  _id: string;
  orderId: string;
  totalAmount: number;
  paymentMethod: "CREDIT_CARD" | "DEBIT_CARD";
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  payhereTransactionId?: string;
  cardDetails: {
    maskedCardNumber?: string;
    cardHolderName?: string;
  };
  createdAt: string;
  refundedAt?: string;
  refundReason?: string;
}

interface EarningsTableProps {
  headers: string[];
  data: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

const EarningsTable: React.FC<EarningsTableProps> = ({ headers, data, setPayments }) => {
  const [payments, setLocalPayments] = useState<Payment[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ title: "", message: "", onConfirm: () => {} });
  const [error, setError] = useState<string | null>(null);

  const handleRefundPayment = (payment: Payment) => {
    openRefundModal(
      "Confirm Refund",
      `Are you sure you want to refund payment for order ${payment.orderId}?`,
      async () => {
        try {
          // Optimistically update the payment status
          const updatedPayments = payments.map((p) =>
            p._id === payment._id
              ? {
                  ...p,
                  paymentStatus: "REFUNDED" as const,
                  refundedAt: new Date().toISOString(),
                  refundReason: `Admin-initiated refund for order ${payment.orderId}`,
                }
              : p
          );
          setLocalPayments(updatedPayments);
          setPayments(updatedPayments); // Update parent state for totals

          // Perform the refund API call
          const response = await refundPayment({
            paymentId: payment._id,
            reason: `Admin-initiated refund for order ${payment.orderId}`,
          });

          if (!response.success) {
            throw new Error(response.message || "Refund failed");
          }

          setIsRefundModalOpen(false);
          setError(null);
        } catch (err) {
          // Revert to original payments on error
          setLocalPayments(data);
          setPayments(data);
          console.error("Refund error:", err);
          const errorMessage = err instanceof Error ? err.message : "Failed to refund payment";
          setError(errorMessage);
        }
      }
    );
  };

  const openRefundModal = (title: string, message: string, onConfirm: () => void) => {
    setIsRefundModalOpen(true);
    setModalConfig({ title, message, onConfirm });
  };

  const getFieldValue = (payment: Payment, header: string) => {
    switch (header.toLowerCase()) {
      case "date":
        return new Date(payment.createdAt).toLocaleDateString();
      case "amount":
        return `LKR ${payment.totalAmount.toFixed(2)}`;
      case "order id":
        return payment.orderId;
      case "method":
        return payment.paymentMethod.replace("_", " ");
      case "status":
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-lg ${
              payment.paymentStatus === "COMPLETED"
                ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200"
                : payment.paymentStatus === "PENDING"
                ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-200"
                : payment.paymentStatus === "REFUNDED"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-200"
                : "bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-200"
            }`}
          >
            {payment.paymentStatus}
          </span>
        );
      case "transaction id":
        return payment.payhereTransactionId || "N/A";
      case "actions":
        return (
          <div className="flex space-x-2">
            {payment.paymentStatus === "COMPLETED" && (
              <button
                onClick={() => handleRefundPayment(payment)}
                className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Refund
              </button>
            )}
          </div>
        );
      default:
        return "";
    }
  };

  const filteredPayments = payments.filter((payment) =>
    [payment.orderId, payment.payhereTransactionId || ""].some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedPayments = [...filteredPayments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <ConfirmationModal
        isOpen={isRefundModalOpen}
        onClose={() => {
          setIsRefundModalOpen(false);
          setError(null);
        }}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText="Refund"
        cancelText="Cancel"
      />

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <div className="p-5 flex justify-between items-center">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="hidden lg:block p-5 w-full text-sm rounded-md overflow-x-auto bg-white dark:bg-gray-700">
        <table className="min-w-[1000px] w-full">
          <thead className="bg-gray-200 border-gray-200 dark:bg-gray-700 dark:border-gray-500">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-start py-4 px-6 font-semibold text-gray-600 dark:text-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((payment, index) => (
              <tr
                key={payment._id}
                className={`border-b border-gray-200 dark:border-gray-500 ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-gray-600" : "bg-gray-100 dark:bg-gray-700"
                } hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors`}
              >
                {headers.map((header, idx) => (
                  <td key={idx} className="py-4 px-6 text-gray-800 dark:text-white">
                    {getFieldValue(payment, header)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden p-5 space-y-4 overflow-y-scroll h-full">
        {sortedPayments.map((payment) => (
          <div
            key={payment._id}
            className="border rounded-md p-4 shadow-md hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-600"
          >
            <div className="space-y-2">
              {headers.map((header, idx) => (
                <div key={idx} className="flex justify-between items-center py-1">
                  <span className="font-medium text-gray-800 dark:text-white">{header}:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {getFieldValue(payment, header)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sortedPayments.length === 0 && (
        <div className="p-5 text-center text-gray-600 dark:text-gray-300">
          No payments found.
        </div>
      )}
    </>
  );
};

export default EarningsTable;