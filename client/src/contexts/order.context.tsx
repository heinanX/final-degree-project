/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import {
  OrderContext,
  Order,
  defaultValues,
} from "../interfaces/order.interface";
import { Cart, CartItem} from "../interfaces/cart.interface";
import { useSocket as cartSocket } from "./cart.context";

export const OrderContextValues = createContext<OrderContext>(defaultValues);

export const useSocket = () => useContext(OrderContextValues);

//---------------------- Provider begins here

function OrderProvider({ children }: PropsWithChildren) {

  const { setNewCart } = cartSocket();
  const [ userOrders, setUserOrders ] = useState<Order[]>([]);
  const [ getOrders, setGetOrders ] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order>({
    customer: "",
    address: {
      cust_name: '',
      street: '',
      zip_code: '',
      city: ''
    },
    order: [],
    total_price: 0,
    discount: 0,
    date: new Date().toDateString(),
    shipped: false,
    returned: false,
    payment_status: "",
    order_status: "",
    _id: ''
  });

  // state used to store order item in: [View.single.Order] component
  const [viewOrderDetails, setViewOrderDetails] = useState<Order | null>(null);

  const getOrdersDatabase = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch product");
      setGetOrders(data)
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  }

  const getUserOrdersDatabase = async () => {
    try {
      const res = await fetch(`/api/orders/user-orders`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch product");
      setUserOrders(data)
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  }

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
        console.log(data);
        setOrder(data);
        localStorage.removeItem('cart');
        setNewCart({
          cart: [],
          total_price: 0,
          address:  {
            cust_name: '',
            street: '',
            zip_code: '',
            city: '' 
          }
        })
      }
    } catch (err) {
      // Handle errors, if any
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };

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
        console.error("Error fetching product", err.message);
      }
    }
  }

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
        getUserOrdersDatabase
      }}
    >
      {children}
    </OrderContextValues.Provider>
  );
}

export default OrderProvider;
