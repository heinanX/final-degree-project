/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartItem } from "./cart.interface";

export interface OrderContext {
    order: Order,
    setOrder: React.Dispatch<React.SetStateAction<Order>>
    createOrderDatabase: (cart: CartItem[], sessionId: string) => void
  }

export interface Order {
    customer: string,
    address: OrderAddress[]
    order: OrderItem[],
    total_price: number,
    discount: number,
    date: Date,
    shipped: boolean,
    returned: boolean,
    payment_status: string,
    order_status: string,
    _id: string
  }

export interface OrderItem {
    product: string,
    quantity: number
  }

export interface OrderAddress {
    street: string,
    zip_code: string,
    city: string
  }
  export const defaultValues = {
    order: {
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
      },
    setOrder: () => {},
    createOrderDatabase: (cart: CartItem[], sessionId: string) => {}
  };