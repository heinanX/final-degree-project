import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CheckoutPage from "../pages/CheckoutPage/Checkout.page";
import AccountPage from "../pages/AccountPage/Account.page";
import LoginPage from "../pages/LoginPage/Login.page";
import ProductPage from "../pages/ProductPage/Product.page";
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSuccess.page";
import NotFoundPage from "../pages/NotFound.page";

const Router = () => {
  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/customer/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/customer/account" element={<AccountPage />} />
        <Route path="/success" element={<OrderSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default Router;
