import React from "react";
import Header from "../components/Restaurant Menu/Header";
import Banner from "../components/Restaurant Menu/Banner";
import Categories from "../components/Restaurant Menu/ResturentCategories";
import RestaurantInfo from "../components/Restaurant Menu/RestaurantInfo";
import Menu from "../components/Restaurant Menu/Menu";

const RestaurantDetail: React.FC = () => (
  <div className="w-full bg-gray-50 min-h-screen flex flex-col">
    <Header />
    <Banner />
    <main className="container mx-auto px-4 py-8 flex-1">
      <Categories />
      <Menu />
      <RestaurantInfo />
      
    </main>
  </div>
);

export default RestaurantDetail;
