import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Layout from "./assets/fonts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="order" element={<Order />} />
          <Route path="cart" element={<Cart />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
