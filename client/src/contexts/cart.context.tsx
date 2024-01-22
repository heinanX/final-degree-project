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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [newCart, setNewCart] = useState<Cart>({
    cart: [],
    total_price: 0,
    address: []
  })
  //const [cartTotal, setCartTotal] = useState<number>(0);

  // A FUNCTION THAT ADDS A PRODUCT TO CART BASED ON ITS TYPE (VHS, DIGITAL OR NEITHER)
  const addToCart = async (product: Product, type: string) => {
    try {
      // Check if type is true
      const isVHS = type === "vhs";
      const isDigital = type === "digital";
  
      // Check if product with the same ID and type already exists in the cart
      const duplicateProduct = newCart.cart.find(
        (cartItem: CartItem) =>
          cartItem.product._id === product._id &&
          (isVHS ? cartItem.vhs : isDigital ? cartItem.digital : false)
      );
  
      // If product already exists in cart, update its quantity
      if (duplicateProduct) {
        duplicateProduct.quantity += 1;
        isVHS
          ? (duplicateProduct.stripe.quantity += 1)
          : (duplicateProduct.stripe.quantity += 1);
        isVHS
          ? (newCart.total_price += duplicateProduct.product.vhs.price)
          : (newCart.total_price += duplicateProduct.product.digital.price);
      } else {
        // If product is not in cart, create a new movie object
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
  
        // Add the new product price to total_price
        newCart.total_price += isVHS
          ? newRental.product.vhs.price
          : newRental.product.digital.price;
  
        // Copy the existing cart and add the new movie to it
        newCart.cart = [...newCart.cart, newRental];
      }
  
      // Update cart state with newCart and then store it inside cart in LS
      setNewCart({ ...newCart });
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (err) {
      // Handle errors, if any
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };
  

  // A FUNCION THAT DELETES A PRODUCT INSIDE CART
  const handleQuantity = (index: number, action: string) => {
    const product = newCart.cart[index];
    console.log('this here', product);
    
    let updatedCart;

    switch (action) {
      case "add":
        product.quantity += 1;
          product.stripe.quantity += 1;
        updatedCart = [...newCart.cart];
        break;

      case "sub":
        product.quantity -= 1;
        updatedCart = [...newCart.cart];
        break;

      case "del":
        cart.splice(index, 1);
        updatedCart = newCart.cart;
        break;
    }
    if (updatedCart) {
      setNewCart({...newCart, cart:updatedCart});
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };


  const handleCheckout = async (addressee: Addressee) => {
    try {
      console.log(addressee);

      const stripeOrders = cart.map((item) => item.stripe);
      console.log(stripeOrders);

      const res = await fetch("api/orders/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stripeOrders),
      });

      if (!res.ok) {
        console.log("failed creating checkout");
      }

      const { url } = await res.json();
      window.location = url;
    } catch (err) {
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
        const oldItems = JSON.parse(cartData) as Cart;

        // Update the cart state with the parsed items from local storage
        setNewCart(oldItems);
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
        handleQuantity,
        handleCheckout,
        newCart,
        setNewCart
      }}
    >
      {children}
    </CartContextValues.Provider>
  );
}

export default CartProvider;
