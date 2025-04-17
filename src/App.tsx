import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/UI/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PaymentMethod from '@/components/Payment/PaymentMethod';
import CardDetails from '@/components/Payment/CardDetails';
import OrderConfirmation from '@/pages/OrderConfirmation';

import Order from "./pages/Order";
import Cart from "./pages/Cart";
import ResturentRegister from "./pages/ResturentRegister";

//-------------- admin--------------------------------------
import AdminLayout from "./pages/admin/AdminLayout";
import AllResturent from "./pages/admin/AllResturent";
import RequestResturent from "./pages/admin/RequestResturent";
import AddResturent from "./pages/admin/AddResturent";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="overview" replace />} /> {/* Relative path */}
        <Route path="overview" element={<Overview />} />
        <Route path="profile" element={<Profile />} />

        {/* Order-related routes grouped under /orders */}
        <Route path="resturent">
            <Route path="" element={<AllResturent />} />
            <Route path="request" element={<RequestResturent />} />
            <Route path="add" element={<AddResturent />} />
        </Route>

        {/* Add more routes as needed to match sidebar */}

      </Route>
    </Routes>
  );
};


//-------------- resturent--------------------------------------
import ResturentLayout from "./pages/restaurants/ResturentLayout";
import Profile from "./pages/restaurants/Profile";
import Overview from "./pages/restaurants/Overview";
import NewOrder from "./pages/restaurants/NewOrder";
import PreparingOrder from "./pages/restaurants/PreparingOrder";
import ReadyOrder from "./pages/restaurants/ReadyOrder";
import CompleteOrder from "./pages/restaurants/CompleteOrder";
import CancelledOrder from "./pages/restaurants/CanceledOrder";
import AllItem from "./pages/restaurants/AllItem";
import AddNewItem from "./pages/restaurants/AddNewItem";
import RestaurantMenu from "./pages/RestaurantMenu";
import FoodHomePage from "./pages/FoodHomePage";

const ResturentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ResturentLayout />}>
        <Route index element={<Navigate to="overview" replace />} /> {/* Relative path */}
        <Route path="overview" element={<Overview />} />
        <Route path="profile" element={<Profile />} />

        {/* Order-related routes grouped under /orders */}
        <Route path="orders">
            <Route path="new" element={<NewOrder />} />
            <Route path="preparing" element={<PreparingOrder />} />
            <Route path="ready" element={<ReadyOrder />} />
            <Route path="completed" element={<CompleteOrder />} />
            <Route path="canceled" element={<CancelledOrder />} />
        </Route>

        {/* menu-related routes grouped under /menu-management */}
        <Route path="menu-management">
            <Route path="all" element={<AllItem />} />
            <Route path="add" element={<AddNewItem />} />
        </Route>

        

        
        {/* Add more routes as needed to match sidebar */}
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resturent-signup" element={<ResturentRegister />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/card-details" element={<CardDetails />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="order" element={<Order />} />
          <Route path="cart" element={<Cart />} /> 
          <Route path="restaurant-menu" element={<RestaurantMenu />} /> 
          <Route path="menu" element={<FoodHomePage />} /> 
        </Route>
        <Route path="/resturent-dashboard/*" element={<ResturentRoutes />} />
        <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;