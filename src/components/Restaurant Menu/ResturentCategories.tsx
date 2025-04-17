import React from "react";

const categories = [
  "local_offer",
  "lunch_dining",
  "restaurant",
  "fastfood",
  "local_cafe",
  "icecream",
  "restaurant",
  "fastfood",
  "local_cafe",
  
];

const Categories: React.FC = () => (
  <div className="flex flex-wrap gap-4 justify-center bg-orange-500 py-4 shadow mb-6 w-full rounded-xl">
    {categories.map((cat) => (
      <div
        key={cat}
        className="bg-orange-100 px-5 py-1 rounded-xl shadow text-gray-700 font-medium cursor-pointer hover:bg-orange-400 hover:text-slate-50 transition"
      >
        {cat}
      </div>
    ))}
  </div>
);

export default Categories;
