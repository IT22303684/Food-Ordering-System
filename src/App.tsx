import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/fonts/Layout";
import PaymentForm from "./components/Payment/PaymentForm";
import PaymentSummary from "./components/Payment/PaymentSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="payment-form" element={<PaymentForm />} />
          <Route path="payment-summary" element={<PaymentSummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
