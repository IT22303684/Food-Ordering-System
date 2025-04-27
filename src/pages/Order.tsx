import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaMotorcycle,
  FaStore,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface OrderStatus {
  id: number;
  status: string;
  description: string;
  time: string;
  completed: boolean;
}

interface Order {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  deliveryAddress: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: string;
  estimatedDeliveryTime: string;
  driverName?: string;
  driverPhone?: string;
  driverLocation?: {
    lat: number;
    lng: number;
  };
  orderDate: string;
  paymentMethod: string;
  deliveryFee: number;
  discount: number;
}

const Order: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [currentStatus, setCurrentStatus] = useState<number>(0);

  // Mock order data - Replace with actual API call
  useEffect(() => {
    // Simulate API call
    const mockOrder: Order = {
      id: orderId || "123",
      restaurantName: "Tasty Bites",
      restaurantAddress: "123 Food Street, Colombo",
      deliveryAddress: "456 Home Avenue, Colombo",
      items: [
        { name: "Chicken Biryani", quantity: 2, price: 1200 },
        { name: "Mango Lassi", quantity: 1, price: 300 },
      ],
      total: 2700,
      status: "preparing",
      estimatedDeliveryTime: "30 minutes",
      driverName: "John Doe",
      driverPhone: "+94 77 123 4567",
      driverLocation: {
        lat: 6.9271,
        lng: 79.8612,
      },
      orderDate: "2024-03-15 14:30",
      paymentMethod: "Credit Card",
      deliveryFee: 200,
      discount: 100,
    };
    setOrder(mockOrder);
  }, [orderId]);

  const statuses: OrderStatus[] = [
    {
      id: 1,
      status: "Order Placed",
      description: "Your order has been received",
      time: "2:30 PM",
      completed: true,
    },
    {
      id: 2,
      status: "Preparing",
      description: "Restaurant is preparing your food",
      time: "2:35 PM",
      completed: true,
    },
    {
      id: 3,
      status: "Ready for Pickup",
      description: "Your order is ready for delivery",
      time: "2:45 PM",
      completed: false,
    },
    {
      id: 4,
      status: "On the Way",
      description: "Your order is being delivered",
      time: "2:50 PM",
      completed: false,
    },
    {
      id: 5,
      status: "Delivered",
      description: "Your order has been delivered",
      time: "3:00 PM",
      completed: false,
    },
  ];

  // Simulate status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) =>
        prev < statuses.length - 1 ? prev + 1 : prev
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Orders
        </Link>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <div className="relative">
            {statuses.map((status, index) => (
              <div key={status.id} className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStatus
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index <= currentStatus ? (
                      <FaMotorcycle className="w-4 h-4" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                    )}
                  </div>
                  {index < statuses.length - 1 && (
                    <div
                      className={`h-16 w-0.5 mx-auto ${
                        index < currentStatus ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{status.status}</h3>
                  <p className="text-sm text-gray-500">{status.description}</p>
                  <p className="text-xs text-gray-400">{status.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Restaurant Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Restaurant Details</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaStore className="text-orange-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">{order.restaurantName}</h3>
                  <p className="text-sm text-gray-500">
                    {order.restaurantAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-orange-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Delivery Address</h3>
                  <p className="text-sm text-gray-500">
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          {order.driverName && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Partner</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaUser className="text-orange-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">{order.driverName}</h3>
                    <p className="text-sm text-gray-500">Delivery Partner</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPhone className="text-orange-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Contact</h3>
                    <p className="text-sm text-gray-500">{order.driverPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Items and Payment Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Order Items</h3>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">Rs. {item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  Rs.{" "}
                  {(order.total - order.deliveryFee + order.discount).toFixed(
                    2
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>Rs. {order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-500">
                  -Rs. {order.discount.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs. {order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span>{new Date(order.orderDate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Delivery Time */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaClock className="text-orange-500 mr-3" />
              <div>
                <h3 className="font-medium">Estimated Delivery Time</h3>
                <p className="text-sm text-gray-500">
                  {order.estimatedDeliveryTime}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Track Order
            </motion.button>
          </div>
        </div>

        {/* Map View (Placeholder) */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Route</h2>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map view will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
