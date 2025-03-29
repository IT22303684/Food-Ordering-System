import React from "react";

const RestaurantInfo: React.FC = () => {
  return (
    <section className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-xl font-bold">Delivery Information</h3>
        <p>📍 123 London Street, UK</p>
        <p>📞 +44 1234 567890</p>
        <p>🕒 10:00 AM - 10:00 PM</p>
      </div>
      <div>
        <h3 className="text-xl font-bold">Payment Options</h3>
        <img src="/images/payment-methods.png" alt="Payment Methods" className="w-full md:w-48" />
      </div>
    </section>
  );
};

export default RestaurantInfo;
