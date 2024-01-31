/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// importing necessary dependencies from React

import {
  Addressee,
  Cart,
  CartContext,
  CartItem,
  defaultValues,
} from "../interfaces/cart.interface";
// importing custom types/interfaces from the cart interface file

import { Product } from "../interfaces/product.interface";
// importing product interface

// creating a context to manage cart-related state
export const CartContextValues = createContext<CartContext>(defaultValues);

// custom hook to access the cart context
export const useSocket = () => useContext(CartContextValues);

//---------------------- Provider begins here

function CartProvider({ children }: PropsWithChildren) {
  // Initializing state for the cart and its total price
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

  // cunction to add a product to the cart based on its type
  const addToCart = async (product: Product, type: string) => {
    try {
      // check if the product is VHS or digital
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
    const product = newCart.cart[index]; //takes incoming index and stores product in a variable
    let updatedCart;
    let updatedTotalPrice = newCart.total_price; //variable to state total price of cart

    switch (action) {
      case "add": //runs when customer increases an item inside cart it
        product.quantity += 1;
        product.stripe.quantity += 1;
        updatedCart = [...newCart.cart];
        updatedTotalPrice += //adds price to total price in cart
          product.vhs
            ? product.product.vhs.price
            : product.product.digital.price;
        break;

      case "sub": //runs when customer decreases an item inside cart it
        product.quantity -= 1;
        product.stripe.quantity -= 1;
        updatedCart = [...newCart.cart];
        updatedTotalPrice -= //subtracts price from total price in cart
          product.vhs
            ? product.product.vhs.price
            : product.product.digital.price;
        break;

      case "del": //runs when customer deletes an item inside cart it
        updatedTotalPrice -= product.vhs //conditional that depending on vhs or digital product multiplies the quantity with price and subtracts it from total price in cart
          ? product.product.vhs.price * product.quantity
          : product.product.digital.price * product.quantity;
        newCart.cart.splice(index, 1); //removes the product from cart
        updatedCart = newCart.cart; //updates variable
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
      // store the updated cart and address in local storage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...newCart,
          address: addressee,
        })
      );

      // extract stripe-specific order details from the cart
      const stripeOrders = newCart.cart.map((item) => item.stripe);

      // call the server to create a checkout session
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
      // handle errors, if any
      if (err instanceof Error) {
        console.error("Error during checkout", err.message);
      }
    }
  };

  // function to initialize the cart from local storage
  const setInitCart = async () => {
    try {
      // retrieve the cart data from local storage
      const cartData = localStorage.getItem("cart");

      // check if there is existing cart data in local storage
      if (cartData) {
        // parse the existing cart data into an array of CartItem objects
        const oldItems = JSON.parse(cartData) as Cart;

        // update the cart state with the parsed items from local storage
        setNewCart(oldItems);
      } else {
        // if there is no existing cart data, initialize local storage with an empty array
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
      // handle errors, if any
      if (err instanceof Error) {
        console.error("Error initializing cart", err.message);
      }
    }
  };

  // useEffect hook to initialize the cart when the component mounts
  useEffect(() => {
    setInitCart();
  }, []);

  // render the CartContextValues.Provider with the cart-related functions and state as values
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

// exporting the CartProvider component as the default export
export default CartProvider;
