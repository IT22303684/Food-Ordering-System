import React from "react";

const RestaurantInfo: React.FC = () => {
  return (
    <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg shadow-md">
      <div className="bg-orange-100 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-orange-500 mb-2">Delivery Information</h3>
        <p>📍 123 London Street, UK</p>
        <p>📞 +44 1234 567890</p>
        <p>🕒 10:00 AM - 10:00 PM</p>
      </div>
      <div className="bg-orange-100 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-orange-500 mb-2">Contact Information</h3>
        <p>If you have changes or delivery issues, please contact us directly.</p>
        <p>📞 +9444343-43</p>
        <p>🌐 <a href="http://mcdonalds.uk/" className="text-blue-500 underline">http://mcdonalds.uk/</a></p>
      </div>
      <div className="bg-orange-500 text-white p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Operational Times</h3>
        <p>Monday - Friday: 9:00 AM - 2:00 AM</p>
        <p>Saturday - Sunday: 9:00 AM - 3:00 AM</p>
        <p>Estimated delivery time: ~30 min</p>
      </div>
    </section>
  );
};

export default RestaurantInfo;
