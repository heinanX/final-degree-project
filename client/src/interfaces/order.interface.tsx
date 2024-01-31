/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cart } from "./cart.interface";

export interface OrderContext {
  getOrders: Order[];
  setGetOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  userOrders: Order[];
  setUserOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  createOrderDatabase: (cart: Cart, sessionId: string) => void;
  getOrdersDatabase: () => void;
  updateOrderDatabase: (updateOrderObject: object, id: string) => void;
  viewOrderDetails: Order | null;
  setViewOrderDetails: React.Dispatch<React.SetStateAction<Order | null>>;
  getUserOrdersDatabase: () => void;
  isOrderLoading: boolean;
  setIsOrderLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultValues = {
  getOrders: [],
  setGetOrders: () => {},
  userOrders: [],
  setUserOrders: () => {},
  order: {
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
  },
  setOrder: () => {},
  createOrderDatabase: (cart: Cart, sessionId: string) => {},
  getOrdersDatabase: () => {},
  updateOrderDatabase: (updateOrderObject: object, id: string) => {},
  viewOrderDetails: null,
  setViewOrderDetails: () => {},
  getUserOrdersDatabase: () => {},
  isOrderLoading: false,
  setIsOrderLoading: () => {}
};

export interface Order {
  customer: string;
  address: OrderAddress;
  order: OrderItem[];
  total_price: number;
  discount: number;
  date: string;
  shipped: boolean;
  returned: boolean;
  payment_status: string;
  order_status: string;
  _id: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
}
export interface OrderItemWithId extends OrderItem {
  _id: string;
}

export interface OrderAddress {
  cust_name: string;
  street: string;
  zip_code: string;
  city: string;
}

