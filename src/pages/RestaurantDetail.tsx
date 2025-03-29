import React from "react";
import Header from "../components/Categories/Header";
import Banner from "../components/Categories/Banner";
import Categories from "../components/Categories/Categories";
import Menu from "../components/Categories/Menu";
import RestaurantInfo from "../components/Categories/RestaurantInfo";

const RestaurantDetail: React.FC = () => {
  return (
    <div className="w-full bg-gray-50">
      <Header />
      <Banner />
      <Categories />
      <Menu />
      <RestaurantInfo />
    </div>
  );
};

export default RestaurantDetail;
