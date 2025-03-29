import React from "react";

const RestaurantInfo: React.FC = () => {
  return (
    <section className="p-4 flex justify-between">
      <div>
        <h3 className="text-xl font-bold">Delivery Information</h3>
        <p>📍 123 Wimukthi Street, Malabe</p>
        <p>📞 +94 713498989</p>
        <p>🕒 10:00 AM - 10:00 PM</p>
      </div>
      <div>
        <h3 className="text-xl font-bold">Payment Options</h3>
        <img src="/images/payment-methods.png" alt="Payment Methods" className="w-48" />
      </div>
    </section>
  );
};

export default RestaurantInfo;
