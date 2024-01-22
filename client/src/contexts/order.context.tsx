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
  const [order, setOrder] = useState<Order>({
    customer: "",
    address: [],
    order: [],
    total_price: 0,
    discount: 0,
    date: new Date(),
    shipped: false,
    returned: false,
    payment_status: "",
    order_status: "",
    _id: ''
  });
  const { newCart } = cartSocket();

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
          session_id: sessionId,
          order: itemsInCart,
          total_price: newCart.total_price,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setOrder(data);
      }
    } catch (err) {
      // Handle errors, if any
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };

  return (
    <OrderContextValues.Provider
      value={{
        order,
        setOrder,
        createOrderDatabase,
      }}
    >
      {children}
    </OrderContextValues.Provider>
  );
}

export default OrderProvider;
