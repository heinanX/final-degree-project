import { Product } from "./product.interface";

export interface CartContext {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  addToCart: (product: Product, type: string) => void;
  handleQuantity: (index: number, action: string) => void;
  handleCheckout: (addressee: Addressee) => void;
  newCart: Cart
  setNewCart: React.Dispatch<React.SetStateAction<Cart>>
}

export const defaultValues = {
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  handleQuantity: () => {},
  handleCheckout: () => {},
  newCart: {
    cart: [],
    total_price: 0,
    address: []
  },
  setNewCart: () => {}
};

export interface CartItem {
  product: Product;
  quantity: number;
  vhs: boolean;
  digital: boolean;
  stripe: {
    price: string,
    quantity: number
  }
}

export interface Addressee {
  cust_name: string;
  street: string,
  zip_code: string,
  city: string
}

export interface Cart {
  cart: CartItem[]
  total_price: number
  address: Addressee[]
}

