import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CartPage from "../pages/CartPage/Cart.page";
import AccountPage from "../pages/AccountPage/Account.page";
import LoginPage from "../pages/LoginPage/Login.page";

const Router = () => {
  return (
    <main className="w-full max-w-7xl">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </main>
  );
};

export default Router;
