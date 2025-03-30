import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/fonts/Layout";

//-------------- resturent--------------------------------------
import ResturentLayout from "./pages/restaurants/ResturentLayout";
import Profile from "./pages/restaurants/Profile";
import Overview from "./pages/restaurants/Overview";
import NewOrder from "./pages/restaurants/NewOrder";
import PreparingOrder from "./pages/restaurants/PreparingOrder";
import ReadyOrder from "./pages/restaurants/ReadyOrder";
import CompleteOrder from "./pages/restaurants/CompleteOrder";
import CancelledOrder from "./pages/restaurants/CancelledOrder";

const ResturentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ResturentLayout />}>
        <Route index element={<Navigate to="overview" replace />} /> {/* Relative path */}
        <Route path="overview" element={<Overview />} />
        <Route path="profile" element={<Profile />} />
        {/* order routes */}
        <Route path="orders/new" element={<NewOrder />} />
        <Route path="orders/preparing" element={<PreparingOrder />} />
        <Route path="orders/ready" element={<ReadyOrder />} />
        <Route path="orders/completed" element={<CompleteOrder />} />
        <Route path="orders/canceled" element={<CancelledOrder />} />

        

        
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
          <Route index element={<Home />} />
        </Route>
        <Route path="/resturent-dashboard/*" element={<ResturentRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;