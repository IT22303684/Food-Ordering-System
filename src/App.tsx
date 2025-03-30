import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/UI/Layout";
import RestaurantDetail from "./pages/RestaurantDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<RestaurantDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
