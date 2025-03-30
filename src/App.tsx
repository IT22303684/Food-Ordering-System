import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/UI/Layout";
import PaymentMethod from '@/components/Payment/PaymentMethod';
import CardDetails from '@/components/Payment/CardDetails';
import OrderConfirmation from '@/pages/OrderConfirmation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/card-details" element={<CardDetails />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
