import React from "react";
<<<<<<< HEAD
import Header from "../components/Restaurant Menu/Header";
import Banner from "../components/Restaurant Menu/Banner";
import Categories from "../components/Restaurant Menu/ResturentCategories";
=======

import Banner from "../components/Restaurant Menu/Banner";
import ResturentCategories from "../components/Restaurant Menu/ResturentCategories";
>>>>>>> frontend
import RestaurantInfo from "../components/Restaurant Menu/RestaurantInfo";
import Menu from "../components/Restaurant Menu/Menu";

const RestaurantDetail: React.FC = () => (
  <div className="w-full bg-gray-50 min-h-screen flex flex-col">
<<<<<<< HEAD
    <Header />
    <Banner />
    <main className="container mx-auto px-4 py-8 flex-1">
      <Categories />
      <Menu />
      <RestaurantInfo />
      
=======
    <Banner />
    <main className="container mx-auto px-4 py-8 flex-1">
      <ResturentCategories />
      <Menu />
      <RestaurantInfo /> 
>>>>>>> frontend
    </main>
  </div>
);

export default RestaurantDetail;
