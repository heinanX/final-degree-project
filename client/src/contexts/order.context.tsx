/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import {
  OrderContext,
  Order,
  defaultValues,
} from "../interfaces/order.interface";
import { Cart, CartItem } from "../interfaces/cart.interface";
// importing custom hook from the cart context
import { useSocket as cartSocket } from "./cart.context";

// creating a context to manage order-related state
export const OrderContextValues = createContext<OrderContext>(defaultValues);

// custom hook to access the order context
export const useSocket = () => useContext(OrderContextValues);

//---------------------- Provider begins here

function OrderProvider({ children }: PropsWithChildren) {
  // accessing the setNewCart function from the cart context
  const { setNewCart } = cartSocket();

  // initializing state for order-related information
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [getOrders, setGetOrders] = useState<Order[]>([]);
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>({
    customer: "",
    address: {
      cust_name: "",
      street: "",
      zip_code: "",
      city: "",
    },
    order: [],
    total_price: 0,
    discount: 0,
    date: new Date().toDateString(),
    shipped: false,
    returned: false,
    payment_status: "",
    order_status: "",
    _id: "",
  });

  // state used to store order item for the [View.single.Order] component
  const [viewOrderDetails, setViewOrderDetails] = useState<Order | null>(null);

  // function to fetch all orders from the server
  const getOrdersDatabase = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch orders");
      setGetOrders(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching orders", err.message);
      }
    }
  };

  // function to fetch user-specific orders from the server
  const getUserOrdersDatabase = async () => {
    try {
      const res = await fetch(`/api/orders/user-orders`);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch user orders");
      setUserOrders(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching user orders", err.message);
      }
    }
  };

  // function to create an order in the database based on cart data and session ID
  const createOrderDatabase = async (cartData: Cart, sessionId: string) => {
    const itemsInCart = cartData.cart.map((item: CartItem) => {
      const { product, quantity, digital, vhs } = item;
      const newObject = {
        product: product._id,
        quantity: quantity,
        digital: digital,
        vhs: vhs,
      };
      return newObject;
    });

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: cartData.address,
          session_id: sessionId,
          order: itemsInCart,
          total_price: cartData.total_price,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setIsOrderLoading(false)
        setOrder(data);
        localStorage.removeItem("cart");
        setNewCart({
          cart: [],
          total_price: 0,
          address: {
            cust_name: "",
            street: "",
            zip_code: "",
            city: "",
          },
        });
      }
    } catch (err) {
      // handle errors, if any
      if (err instanceof Error) {
        console.error("Error creating order", err.message);
      }
    }
  };

  // function to update an order in the database
  const updateOrderDatabase = async (updateOrderObject: object, id: string) => {
    try {
      const res = await fetch(`/api/orders/manage-order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateOrderObject),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setViewOrderDetails(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error updating order", err.message);
      }
    }
  };

  // render the OrderContextValues.Provider with the order-related functions and state as values
  return (
    <OrderContextValues.Provider
      value={{
        getOrders,
        setGetOrders,
        userOrders,
        setUserOrders,
        order,
        setOrder,
        createOrderDatabase,
        getOrdersDatabase,
        updateOrderDatabase,
        viewOrderDetails,
        setViewOrderDetails,
        getUserOrdersDatabase,
        isOrderLoading,
        setIsOrderLoading,
      }}
    >
      {children}
    </OrderContextValues.Provider>
  );
}

export default OrderProvider;
