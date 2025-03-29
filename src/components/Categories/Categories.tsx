import React from "react";

const categories = ["Full Course", "Vegan Selection", "Low-Calorie Choice"];

const Categories: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-100">
      {categories.map((category, index) => (
        <div key={index} className="bg-white shadow-md px-4 py-2 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
