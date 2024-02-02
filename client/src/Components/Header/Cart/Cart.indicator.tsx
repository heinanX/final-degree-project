import { useEffect, useState } from "react";
import { useSocket as cartSocket } from "../../../contexts/cart.context";

/* A COMPONENT THAT RENDERS OUT THE QUANTITY OF PRODUCTS IN CART */

const CartIndicator = () => {
  const { newCart } = cartSocket();
  const [quantity, setQuantity] = useState<number>(0);

  // Function to calculate total quantity in cart
  const calculateQuantity = () => {
    let qty = 0;
    if (newCart.cart) {
      newCart.cart.map((item) => (qty += item.quantity));
      setQuantity(qty);
    }
    return;
  };

  useEffect(() => {
    calculateQuantity();
  }, [newCart]);

  return (
    <div id="cartIndicator" className="absolute text-sm bottom-3 left-4">
      {quantity != 0 ? <p>{quantity}</p> : <></>}
    </div>
  );
};

export default CartIndicator;
