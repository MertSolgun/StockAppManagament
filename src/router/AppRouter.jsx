import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Purchases from "../pages/Purchases";
import Sales from "../pages/Sales";
import Firms from "../pages/Firms";
import Brands from "../pages/Brands";
import Products from "../pages/Products";
import Market from "../pages/Market";
import News from "../pages/News";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />}></Route>
            <Route path="purchases" element={<Purchases />}></Route>
            <Route path="sales" element={<Sales />}></Route>
            <Route path="firms" element={<Firms />}></Route>
            <Route path="brands" element={<Brands />}></Route>
            <Route path="products" element={<Products />}></Route>
            <Route path="market" element={<Market />}></Route>
            <Route path="news" element={<News />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
