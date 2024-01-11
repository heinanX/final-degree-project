import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import CartPage from "../../pages/CartPage";
import LoginPage from "../../pages/LoginPage";
import CustomerPage from "../../pages/CustomerPage";

const Router = () => {
  return (
    <main className=" w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/account" element={<CustomerPage />} />
      </Routes>
    </main>
  );
};

export default Router;
