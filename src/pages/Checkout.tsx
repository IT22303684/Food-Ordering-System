import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder, getProfile, updateOrderStatus, initiatePayment } from "../utils/api";
import { toast } from "react-toastify";

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartId, cartItems, cartTotal, clearCartItems } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Sri Lanka",
  });
  const [paymentMethod, setPaymentMethod] = useState<
    "CREDIT_CARD" | "DEBIT_CARD" | "CASH" | "ONLINE"
  >("CREDIT_CARD");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const profile = await getProfile();
        if (profile && profile.address) {
          setDefaultAddress(profile.address);
          setDeliveryAddress({
            ...profile.address,
            country: "Sri Lanka",
          });
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
        toast.error("Failed to fetch default address");
      }
    };

    if (user?.id) {
      fetchDefaultAddress();
    }
  }, [user?.id]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardPayment = async (orderId: string, cartId: string) => {
    try {
      if (!cardDetails.cardNumber || !cardDetails.cardHolderName || !cardDetails.expiryDate || !cardDetails.cvv) {
        throw new Error("Please fill in all card details");
      }

      // Basic client-side validation
      if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
        throw new Error("Invalid card number");
      }
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
        throw new Error("Invalid expiry date (MM/YY)");
      }
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        throw new Error("Invalid CVV");
      }

      const paymentData = {
        userId: user!.id,
        cartId,
        orderId,
        restaurantId: cartItems[0].restaurantId,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          restaurantId: item.restaurantId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })),
        totalAmount: cartTotal,
        paymentMethod: paymentMethod as "CREDIT_CARD" | "DEBIT_CARD",
        cardDetails: {
          cardNumber: cardDetails.cardNumber,
          cardHolderName: cardDetails.cardHolderName,
        },
      };

      const response = await initiatePayment(paymentData);
      const { data } = response;
      const { payherePayload, hash } = data;

      // Log payload and hash for debugging
      console.log("PayHere Payload:", payherePayload);
      console.log("PayHere Hash:", hash);

      // Validate required fields
      if (!payherePayload.merchant_id || !payherePayload.order_id || !payherePayload.amount || !payherePayload.currency) {
        throw new Error("Invalid PayHere payload: Missing required fields");
      }
      if (!hash) {
        throw new Error("Invalid PayHere hash: Hash is missing");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://sandbox.payhere.lk/pay/checkout";

      Object.keys(payherePayload).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payherePayload[key];
        form.appendChild(input);
      });

      const hashInput = document.createElement("input");
      hashInput.type = "hidden";
      hashInput.name = "hash";
      hashInput.value = hash;
      form.appendChild(hashInput);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("Please login to place an order");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (Object.values(deliveryAddress).some((value) => !value)) {
      toast.error("Please fill in all address fields");
      return;
    }

    if ((paymentMethod === "CREDIT_CARD" || paymentMethod === "DEBIT_CARD") && !cartId) {
      toast.error("Cart not found. Please add items to cart.");
      return;
    }

    try {
      setLoading(true);
      const orderPaymentMethod =
        paymentMethod === "DEBIT_CARD" ? "CREDIT_CARD" : paymentMethod;

      const orderData = {
        userId: user.id,
        restaurantId: cartItems[0].restaurantId,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryAddress,
        paymentMethod: orderPaymentMethod as "CREDIT_CARD" | "CASH" | "ONLINE",
      };

      const order = await createOrder(orderData);

      if (paymentMethod === "CREDIT_CARD" || paymentMethod === "DEBIT_CARD") {
        if (!showCardDetails) {
          setShowCardDetails(true);
          setLoading(false);
          return;
        }
        await handleCardPayment(order._id, cartId!);
      } else {
        await updateOrderStatus(order._id, "CONFIRMED");
        await clearCartItems();
        toast.success("Order placed successfully!");
        navigate("/orders");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to place order"
      );
    } finally {
      if (paymentMethod !== "CREDIT_CARD" && paymentMethod !== "DEBIT_CARD" || showCardDetails) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (paymentMethod !== "CREDIT_CARD" && paymentMethod !== "DEBIT_CARD") {
      setShowCardDetails(false);
      setCardDetails({
        cardNumber: "",
        cardHolderName: "",
        expiryDate: "",
        cvv: "",
      });
    }
  }, [paymentMethod]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>Rs. {cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address and Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

          {defaultAddress && (
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  Default Address
                </h3>
                <p className="text-gray-600">{defaultAddress.street}</p>
                <p className="text-gray-600">
                  {defaultAddress.city}, {defaultAddress.state}{" "}
                  {defaultAddress.zipCode}
                </p>
                <p className="text-gray-600">{defaultAddress.country}</p>
              </div>

              <button
                type="button"
                onClick={() => setShowNewAddress(!showNewAddress)}
                className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-2"
              >
                {showNewAddress ? (
                  <>
                    <span>Use Default Address</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Use Different Address</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {showNewAddress && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={deliveryAddress.street}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={deliveryAddress.city}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={deliveryAddress.state}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={deliveryAddress.zipCode}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={deliveryAddress.country}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                    disabled
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value as "CREDIT_CARD" | "DEBIT_CARD" | "CASH" | "ONLINE"
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="CASH">Cash on Delivery</option>
                <option value="ONLINE">Online Payment</option>
              </select>
            </div>

            {(paymentMethod === "CREDIT_CARD" || paymentMethod === "DEBIT_CARD") && showCardDetails && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                    placeholder="1234 5678 1234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardHolderName"
                    value={cardDetails.cardHolderName}
                    onChange={handleCardDetailsChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading
                ? "Placing Order..."
                : (paymentMethod === "CREDIT_CARD" || paymentMethod === "DEBIT_CARD") && !showCardDetails
                ? "Proceed to Payment"
                : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;