import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/fonts/Layout";
import RestaurantDetail from "./pages/RestaurantDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant-detail" element={<RestaurantDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
