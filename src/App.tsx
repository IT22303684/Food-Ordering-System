import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/fonts/Layout";
import PaymentForm from "./components/Payment/PaymentForm";
import PaymentSummary from "./components/Payment/PaymentSummary";
import PaymentMethod from "./components/Payment/PaymentMethod";
import OrderSummary from "./components/Payment/OrderSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="payment-form" element={<PaymentForm />} />
          <Route path="payment-summary" element={<PaymentSummary />} />
          <Route path="payment-method" element={<PaymentMethod />} />
          <Route path="order-summary" element={<OrderSummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
