import React from "react";

import Banner from "../components/Restaurant Menu/Banner";
import ResturentCategories from "../components/Restaurant Menu/ResturentCategories";
import RestaurantInfo from "../components/Restaurant Menu/RestaurantInfo";
import Menu from "../components/Restaurant Menu/Menu";

const RestaurantDetail: React.FC = () => (
  <div className="w-full bg-gray-50 min-h-screen flex flex-col">
    <Banner />
    <main className="container mx-auto px-4 py-8 flex-1">
      <ResturentCategories />
      <Menu />
      <RestaurantInfo /> 
    </main>
  </div>
);

export default RestaurantDetail;
