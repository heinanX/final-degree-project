/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../interfaces/product.interface";
import { CartContext, CartItem } from "../interfaces/cart.interface";

const defaultValues = {
  cart: [],
  setCart: () => {},
  addToCart: () => {},
};

export const CartContextValues = createContext<CartContext>(defaultValues);

export const useSocket = () => useContext(CartContextValues);

//---------------------- Provider begins here

function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // A FUNCTION THAT ADDS A PRODUCT TO CART BASED ON ITS TYPE (VHS, DIGITAL OR NEITHER)
  const addToCart = async (product: Product, type: string) => {
    try {
      // Check if type is true
      const isVHS = type === "vhs";
      const isDigital = type === "digital";

      //variable for updated cart
      let updatedCart;

      // Check if product with the same ID and type already exists in the cart
      const duplicateProduct = cart.find(
        (cartItem: CartItem) =>
          cartItem.product._id === product._id &&
          //(isVHS ? cartItem.vhs : isDigital ? cartItem.digital : true) --- console.log('remove line later')
          (isVHS ? cartItem.vhs : isDigital ? cartItem.digital : false)
      );

      // If product already exists in cart, update its quantity, Copy the existing cart to create a new array and trigger a state update
      if (duplicateProduct) {
        duplicateProduct.quantity += 1;
        updatedCart = [...cart];
      } else {
        //  If product is not in cart, create a new movie object
        const newRental = {
          product: product,
          quantity: 1,
          vhs: isVHS,
          digital: isDigital,
        };
        // Copy the existing cart and add the new movie to it
        updatedCart = [...cart, newRental];
      }

      // update cart state with updatedCart and then store it inside cart in LS
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (err) {
      // Handle errors, if any
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };

  // A FUNCTION THAT INITIALIZES CART FROM LS
  const setInitCart = async () => {
    try {
      // Retrieve the cart data from local storage
      const cartData = localStorage.getItem("cart");

      // Check if there is existing cart data in local storage
      if (cartData) {
        // Parse the existing cart data into an array of CartItem objects
        const oldItems = JSON.parse(cartData) as CartItem[];

        // Update the cart state with the parsed items from local storage
        setCart(oldItems);
      } else {
        // If there is no existing cart data, initialize local storage with an empty array
        localStorage.setItem("cart", JSON.stringify([]));
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };

  useEffect(() => {
    setInitCart();
  }, []);

  return (
    <CartContextValues.Provider
      value={{
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </CartContextValues.Provider>
  );
}

export default CartProvider;
