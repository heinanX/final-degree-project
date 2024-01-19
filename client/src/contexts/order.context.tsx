/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import {
  OrderContext,
  Order,
  defaultValues,
} from "../interfaces/order.interface";

export const OrderContextValues = createContext<OrderContext>(defaultValues);

export const useSocket = () => useContext(OrderContextValues);

//---------------------- Provider begins here

function OrderProvider({ children }: PropsWithChildren) {
  const [order, setOrder] = useState<Order>({
    customer: "",
    order: [],
    total_price: 0,
    discount: 0,
    date: new Date(),
    shipped: false,
    returned: false,
    payment_status: "",
    order_status: "",
  });

  const createOrderDatabase = () => {
    
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
