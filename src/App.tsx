import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/fonts/Layout";
import PaymentMethod from "./components/Payment/PaymentMethod";
import OrderSummary from "./components/Payment/OrderSummary";
import CardDetails from './pages/CardDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="payment-method" element={<PaymentMethod />} />
          <Route path="order-summary" element={<OrderSummary />} />
          <Route path="/card-details" element={<CardDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
