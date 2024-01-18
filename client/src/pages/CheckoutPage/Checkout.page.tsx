import { useSocket as cartSocket } from "../../contexts/cart.context";
import { useSocket as customerSocket } from "../../contexts/customer.context";
import CheckoutDetails from "./Checkout.details";
import PurchaseDetails from "./Components/Purchase.details";


const Checkout = () => {
  const { handleCheckout } = cartSocket();
  const { isLoggedIn } = customerSocket();

  return (
    <div className="w-full max-w-7xl py-24 px-10 flex flex-col">
      <h1 className="text-white text-5xl py-4 text-center">checkout</h1>
      <hr className="pb-10 border-teal-600" />
      <div className="flex flex-row gap-8 items-center">
        <CheckoutDetails />
        <PurchaseDetails />
      </div>
      <div>
        <button onClick={handleCheckout} disabled={!isLoggedIn}></button>
      </div>
    </div>
  );
};

export default Checkout;
