import { useEffect, useState } from "react";
import { useSocket as cartSocket } from "../../../contexts/cart.context";

/* A COMPONENT THAT RENDERS OUT THE QUANTITY OF PRODUCTS IN CART */

const CartIndicator = () => {
  // Destructures cart from cart context
  const { newCart } = cartSocket();

  // State to track total quantity in cart
  const [quantity, setQuantity] = useState<number>(0);

  // Function to calculate total quantity in cart
  const calculateQuantity = () => {
    let qty = 0;
    if (newCart.cart) {
      // Iterating over each item in the cart and summing up the quantities
      newCart.cart.map((item) => (qty += item.quantity));

      // Updates state with new total quantity
      setQuantity(qty);
    }
    return;
  };

  // useEffect to recalculate new quantity whenever cart changes
  useEffect(() => {
    calculateQuantity();
  }, [newCart]);

  // Renders a div with a p tag containing total quantity in cart
  return (
    <div id="cartIndicator" className="absolute text-sm bottom-3 left-4">
      {quantity != 0 ? <p>{quantity}</p> : <></>}
    </div>
  );
};

export default CartIndicator;
