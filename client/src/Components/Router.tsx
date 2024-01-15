import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CheckoutPage from "../pages/CheckoutPage/Checkout.page";
import AccountPage from "../pages/AccountPage/Account.page";
import LoginPage from "../pages/LoginPage/Login.page";

const Router = () => {
  return (
    <main className="w-full flex flex-col items-center ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </main>
  );
};

export default Router;
