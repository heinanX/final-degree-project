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

  const addToCart = async (product: Product, type: string) => {
    try {
      const duplicateProduct = cart.find(
        (cartItem: CartItem) => cartItem.product._id === product._id
      );
  
      if (duplicateProduct && (duplicateProduct.vhs === true && duplicateProduct.digital !== false )) {
        // If the product already exists in the cart, update its quantity
        duplicateProduct.quantity += 1;
        setCart((prevCart) => [...prevCart]);
  
        // Update local storage
        localStorage.setItem("cart", JSON.stringify([...cart]));
      } else if ( duplicateProduct && (duplicateProduct.vhs === false && duplicateProduct.digital !== true  )) {
        // If the product already exists in the cart, update its quantity
        duplicateProduct.quantity += 1;
        setCart((prevCart) => [...prevCart]);
  
        // Update local storage
        localStorage.setItem("cart", JSON.stringify([...cart]));
      } else {
        if (type ==='vhs') {
         // If the product is not in the cart, add it
        const newMovie = {
          product: product,
          quantity: 1,
          vhs: true,
          digital: false,
        };
        setCart((prevCart) => [...prevCart, newMovie]);
  
        // Update local storage
        return localStorage.setItem("cart", JSON.stringify([...cart, newMovie]));
        }
        if (type === 'digital') {
                    // If the product is not in the cart, add it
        const newMovie = {
          product: product,
          quantity: 1,
          vhs: true,
          digital: false,
        };
        setCart((prevCart) => [...prevCart, newMovie]);
  
        // Update local storage
        return localStorage.setItem("cart", JSON.stringify([...cart, newMovie]));
        }

      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };
  

  const setInitCart = async () => {
    try {
        const cartData = localStorage.getItem("cart");

        if (cartData !== null) {
          const oldItems = JSON.parse(cartData) as CartItem[];
          setCart(oldItems);
        } else {
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
