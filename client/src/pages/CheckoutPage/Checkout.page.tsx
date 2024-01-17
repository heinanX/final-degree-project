import { useSocket as cartSocket } from "../../contexts/cart.context";
import CheckoutDetails from "./Checkout.details";
import PurchaseDetails from "./Components/purchase.details";

const Checkout = () => {
  const { handleCheckout } = cartSocket();

  return (
    <div className="w-full max-w-7xl py-24 px-10 flex flex-col">
      <h1 className="text-white text-5xl py-4 text-center">checkout</h1>
      <hr className="pb-10 border-teal-600" />
      <div className="flex flex-row gap-8 items-center">
        <CheckoutDetails />
        <PurchaseDetails />
      </div>
      <div>
        <button onClick={handleCheckout}></button>
      </div>
    </div>
  );
};

export default Checkout;
