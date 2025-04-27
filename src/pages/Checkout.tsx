import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  createOrder,
  getProfile,
  updateOrderStatus,
  assignDeliveryDriver,
  getOrderById,
} from "../utils/api";
import { toast } from "react-toastify";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from "../components/Modal";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCartItems } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<
    [number, number] | null
  >(null);
  const [mapCenter, setMapCenter] = useState({ lat: 1.3143, lng: 103.7093 });
  const [showNoDriversModal, setShowNoDriversModal] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Sri Lanka",
  });

  const [paymentMethod, setPaymentMethod] = useState<
    "CREDIT_CARD" | "CASH" | "ONLINE"
  >("CREDIT_CARD");

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

  const handleCreditCardPayment = async (orderId: string) => {
    try {
      // Here you would integrate with your payment service provider
      // For example, using Stripe:
      // const stripe = await loadStripe('your_publishable_key');
      // const { error } = await stripe.redirectToCheckout({
      //   sessionId: 'your_session_id'
      // });

      // For demo purposes, we'll simulate a successful payment
      const paymentSuccess = true; // Replace with actual payment processing

      if (paymentSuccess) {
        // Update order status to CONFIRMED after successful payment
        await updateOrderStatus(orderId, "CONFIRMED");
        await clearCartItems();
        toast.success("Payment successful!");
        navigate("/orders");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const location: [number, number] = [e.latLng.lat(), e.latLng.lng()];
      setDeliveryLocation(location);
      setMapCenter({ lat: location[0], lng: location[1] });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setDeliveryLocation(newLocation);
          setMapCenter({ lat: newLocation[0], lng: newLocation[1] });
         
        },
        (error) => {
          toast.error("Failed to get location");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

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

    if (!deliveryLocation) {
      toast.error("Please select a delivery location on the map");
      return;
    }

    try {
      setLoading(true);

      // First create the order
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
        paymentMethod,
      };

      const order = await createOrder(orderData);
      console.log("Order created successfully:", order);

      // Verify the order exists and has an ID
      if (!order || !order._id) {
        throw new Error("Order creation failed - no order ID received");
      }

      // Add a small delay to ensure order is processed
      console.log("Waiting for order to be processed...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verify order exists in database
      try {
        const verifiedOrder = await getOrderById(order._id);
        console.log("Order verified in database:", verifiedOrder);

        if (!verifiedOrder) {
          throw new Error("Order not found in database");
        }
      } catch (verifyError) {
        console.error("Order verification error:", verifyError);
        throw new Error("Failed to verify order in database");
      }

      // After verification, assign delivery driver using the order ID
      console.log("Attempting to assign delivery driver for order:", order._id);
      console.log("Delivery location:", deliveryLocation);

      try {
        // Format the location data properly - swap lat/lng for backend
        const formattedLocation: [number, number] = [
          deliveryLocation[0], // longitude
          deliveryLocation[1], // latitude
        ];

        console.log("Formatted location for backend:", formattedLocation);
        const deliveryResponse = await assignDeliveryDriver(
          order._id,
          formattedLocation
        );
        console.log("Delivery assignment response:", deliveryResponse);

        if (
          deliveryResponse.status === "error" &&
          deliveryResponse.message === "No available drivers found in the area"
        ) {
          setShowNoDriversModal(true);
          return;
        }

        if (deliveryResponse.status !== "success") {
          throw new Error(
            deliveryResponse.message || "Failed to assign delivery driver"
          );
        }

        toast.success("Order placed successfully with delivery assigned!");

        if (paymentMethod === "CREDIT_CARD") {
          await handleCreditCardPayment(order._id);
        } else {
          await clearCartItems();
          navigate("/orders");
        }
      } catch (deliveryError) {
        console.error("Delivery assignment error:", deliveryError);
        toast.warning(
          "Order placed but delivery assignment failed. Please contact support."
        );
        await clearCartItems();
        navigate("/orders", {
          state: {
            message:
              "Delivery assignment failed. Please contact support for assistance.",
          },
        });
      }
    } catch (error) {
      console.error("Order process error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process order"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNoDriversModalConfirm = async () => {
    setShowNoDriversModal(false);
    await clearCartItems();
    navigate("/orders", {
      state: {
        message:
          "No delivery drivers available. Please contact support for assistance.",
      },
    });
  };

  const handleNoDriversModalClose = () => {
    setShowNoDriversModal(false);
  };

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

        {/* Delivery Address and Location */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Delivery Location</h2>
            <button
              onClick={getCurrentLocation}
              className="flex items-center space-x-2 text-orange-500 hover:text-orange-600"
            >
              <FaMapMarkerAlt />
              <span>Use Current Location</span>
            </button>
          </div>

          <div className="h-64 w-full rounded-lg overflow-hidden mb-4">
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              libraries={["places"]}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={15}
                onClick={handleMapClick}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  mapTypeControl: true,
                  streetViewControl: true,
                  fullscreenControl: true,
                }}
              >
                {deliveryLocation && (
                  <Marker
                    position={{
                      lat: deliveryLocation[0],
                      lng: deliveryLocation[1],
                    }}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Click on the map to set your delivery location
          </p>

          {deliveryLocation && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Selected Location:
              </p>
              <p className="text-sm text-gray-600">
                Lat: {deliveryLocation[0].toFixed(4)}, Long:{" "}
                {deliveryLocation[1].toFixed(4)}
              </p>
            </div>
          )}

          {/* Delivery Address Form */}
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

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value as "CREDIT_CARD" | "CASH" | "ONLINE"
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="CASH">Cash on Delivery</option>
                  <option value="ONLINE">Online Payment</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !deliveryLocation}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showNoDriversModal}
        onClose={handleNoDriversModalClose}
        onConfirm={handleNoDriversModalConfirm}
        title="No Available Drivers"
        message="No delivery drivers are currently available in your area. You can place your order and wait for the driver to be assigned. Please contact support for assistance."
        confirmText="Continue to Orders"
        cancelText="Stay on Page"
      />
    </div>
  );
};

export default Checkout;
