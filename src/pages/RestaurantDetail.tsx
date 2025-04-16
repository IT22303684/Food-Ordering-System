import React from "react";
import Header from "../components/Categories/Header";
import Banner from "../components/Categories/Banner";
import Categories from "../components/Categories/Categories";
import RestaurantInfo from "../components/Categories/RestaurantInfo";
import Menu from "../components/Categories/Menu";

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
