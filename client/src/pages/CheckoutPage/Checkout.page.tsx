import { useEffect } from "react";
import { useSocket as cartSocket } from "../../contexts/cart.context";
import { useSocket as customerSocket } from "../../contexts/customer.context";
import CheckoutDetails from "./Checkout.details";
import PurchaseDetails from "./Components/Purchase.details";

/*
  CHECKOUT COMPONENT
  - Ensures that the user is logged in before proceeding to checkout.
  - Displays checkout details and purchase details in a flex container.
  - Provides a button to handle the checkout process.
*/

const Checkout = () => {
  // Destructuring functions and state from cartSocket and customerSocket
  const { handleCheckout } = cartSocket();
  const { isLoggedIn, loadingIsLoggedIn } = customerSocket();

  // useEffect hook to check and redirect if the user is not logged in
  useEffect(() => {
    if (!loadingIsLoggedIn && !isLoggedIn) {
      // Redirect to the login page if the user is not logged in
      window.location.href = "/customer/login";
    }
  }, [loadingIsLoggedIn]);

  // Main component rendering
  return (
    <>
      {loadingIsLoggedIn || !loadingIsLoggedIn && !isLoggedIn ? (
        <></>
      ) : (
        <div className="w-full max-w-7xl py-24 px-10 flex flex-col">
          {/* Checkout title */}
          <h1 className="text-white text-5xl py-4 text-center">checkout</h1>
          {/* Horizontal rule for visual separation */}
          <hr className="pb-10 border-teal-600" />
          {/* Flex container for checkout and purchase details */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <CheckoutDetails />
            <PurchaseDetails />
          </div>
          {/* Checkout button */}
          <div>
            <button onClick={() => handleCheckout} disabled={!isLoggedIn}>
              {/* Add button content here */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
