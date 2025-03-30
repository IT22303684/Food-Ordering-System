import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/UI/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PaymentMethod from '@/components/Payment/PaymentMethod';
import CardDetails from '@/components/Payment/CardDetails';
import OrderConfirmation from '@/pages/OrderConfirmation';

import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Layout from "./assets/fonts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/card-details" element={<CardDetails />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="order" element={<Order />} />
          <Route path="cart" element={<Cart />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
