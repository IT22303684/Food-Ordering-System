import React from "react";
import { Button } from "./Button";
import { Icon } from "@/components/UI/Icon";

const categories = [
  { name: "Offers", icon: "local_offer" },
  { name: "Burgers", icon: "lunch_dining" },
  { name: "Fries", icon: "restaurant" },
  { name: "Snacks", icon: "fastfood" },
  { name: "Cold Drinks", icon: "local_cafe" },
  { name: "Desserts", icon: "icecream" },
];

const Categories: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100">
      {categories.map((category, index) => (
        <Button
          key={index}
          className="bg-white shadow-md px-4 py-3 rounded-lg flex items-center gap-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border hover:bg-orange-500 hover:text-white"
        >
          <Icon name={category.icon} size="20px" />
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
