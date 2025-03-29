import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/fonts/Layout";
import ResturentLayout from "./pages/restaurants/ResturentLayout"


const ResturentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ResturentLayout />}>
      </Route>
    </Routes>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/resturent-dashboard/*" element={<ResturentRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
