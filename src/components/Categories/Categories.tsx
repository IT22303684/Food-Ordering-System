import React from "react";

const categories = [
  "local_offer",
  "lunch_dining",
  "restaurant",
  "fastfood",
  "local_cafe",
  "icecream",
];

const Categories: React.FC = () => (
  <div className="flex flex-wrap gap-4 justify-center bg-gray-100 py-4 rounded-lg shadow mb-6">
    {categories.map((cat) => (
      <div
        key={cat}
        className="bg-white px-6 py-2 rounded-full shadow text-gray-700 font-medium cursor-pointer hover:bg-orange-100 transition"
      >
        {cat}
      </div>
    ))}
  </div>
);

export default Categories;
