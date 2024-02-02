/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Addressee,
  Cart,
  CartContext,
  CartItem,
  defaultValues,
} from "../interfaces/cart.interface";

import { Product } from "../interfaces/product.interface";
export const CartContextValues = createContext<CartContext>(defaultValues);
export const useSocket = () => useContext(CartContextValues);

//---------------------- Provider begins here

function CartProvider({ children }: PropsWithChildren) {
  const [newCart, setNewCart] = useState<Cart>({
    cart: [],
    total_price: 0,
    address: {
      cust_name: "",
      street: "",
      zip_code: "",
      city: "",
    },
  });

  // function to add a product to the cart based on its type
  const addToCart = async (product: Product, type: string) => {
    try {
      const isVHS = type === "vhs";
      const isDigital = type === "digital";

      // check if the product already exists in the cart
      const duplicateProduct = newCart.cart.find(
        (cartItem: CartItem) =>
          cartItem.product._id === product._id &&
          (isVHS ? cartItem.vhs : isDigital ? cartItem.digital : false)
      );

      // if the product is already in the cart, update its quantity
      if (duplicateProduct) {
        duplicateProduct.quantity += 1;
        duplicateProduct.stripe.quantity += 1;
        newCart.total_price += isVHS
          ? duplicateProduct.product.vhs.price
          : duplicateProduct.product.digital.price;
      } else {
        // if the product is not in the cart, create a new entry
        const newRental = {
          product: product,
          quantity: 1,
          vhs: isVHS,
          digital: isDigital,
          stripe: {
            price: isVHS
              ? product.vhs.stripe_price_id
              : product.digital.stripe_price_id,
            quantity: 1,
          },
        };

        // update the total price and add the new entry to the cart
        newCart.total_price += isVHS
          ? newRental.product.vhs.price
          : newRental.product.digital.price;
        newCart.cart = [...newCart.cart, newRental];
      }

      // update the cart state and store it in local storage
      setNewCart({ ...newCart });
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (err) {
      // handle errors, if any
      if (err instanceof Error) {
        console.error("Error adding product to cart", err.message);
      }
    }
  };

  // function to handle quantity changes in the cart
  const handleQuantity = (index: number, action: string) => {
    const product = newCart.cart[index];
    let updatedCart;
    let updatedTotalPrice = newCart.total_price;

    switch (action) {
      case "add": //runs when customer increases an item inside cart it
        product.quantity += 1;
        product.stripe.quantity += 1;
        updatedCart = [...newCart.cart];
        updatedTotalPrice +=
          product.vhs
            ? product.product.vhs.price
            : product.product.digital.price;
        break;

      case "sub":
        product.quantity -= 1;
        product.stripe.quantity -= 1;
        updatedCart = [...newCart.cart];
        updatedTotalPrice -=
          product.vhs
            ? product.product.vhs.price
            : product.product.digital.price;
        break;

      case "del":
        updatedTotalPrice -= product.vhs
          ? product.product.vhs.price * product.quantity
          : product.product.digital.price * product.quantity;
        newCart.cart.splice(index, 1);
        updatedCart = newCart.cart;
        break;
    }

    // update the cart state and store it in local storage
    if (updatedCart) {
      setNewCart({
        ...newCart,
        cart: updatedCart,
        total_price: updatedTotalPrice,
      });
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...newCart,
          cart: updatedCart,
          total_price: updatedTotalPrice,
        })
      );
    }
  };

  // function to handle the checkout process
  const handleCheckout = async (addressee: Addressee) => {
    try {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...newCart,
          address: addressee,
        })
      );

      const stripeOrders = newCart.cart.map((item) => item.stripe);
      const res = await fetch("api/orders/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stripeOrders),
      });

      const { url } = await res.json();
      window.location = url;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error during checkout", err.message);
      }
    }
  };

  // function to initialize the cart from local storage
  const setInitCart = async () => {
    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const oldItems = JSON.parse(cartData) as Cart;

        setNewCart(oldItems);
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            cart: [],
            total_price: 0,
            address: {
              cust_name: "",
              street: "",
              zip_code: "",
              city: "",
            },
          })
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error initializing cart", err.message);
      }
    }
  };

  useEffect(() => {
    setInitCart();
  }, []);

  return (
    <CartContextValues.Provider
      value={{
        addToCart,
        handleQuantity,
        handleCheckout,
        newCart,
        setNewCart,
        setInitCart,
      }}
    >
      {children}
    </CartContextValues.Provider>
  );
}

export default CartProvider;
