export interface OrderContext {
    order: Order,
    setOrder: React.Dispatch<React.SetStateAction<Order>>
    createOrderDatabase: () => void
  }

export interface Order {
    customer: string,
    order: OrderItem[],
    total_price: number,
    discount: number,
    date: Date,
    shipped: boolean,
    returned: boolean,
    payment_status: string,
    order_status: string,
  }

export interface OrderItem {
    product: string,
    quantity: number
  }
  export const defaultValues = {
    order: {
        customer: "",
        order: [],
        total_price: 0,
        discount: 0,
        date: new Date(),
        shipped: false,
        returned: false,
        payment_status: "",
        order_status: "",
      },
    setOrder: () => {},
    createOrderDatabase: () => {}
  };