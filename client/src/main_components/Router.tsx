import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/account" element={<AccountPage />} /> */}
      </Routes>
    </main>
  );
};

export default Router;
