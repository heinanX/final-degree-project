import { Product } from "./product.interface";

export interface CartContext {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  addToCart: (product: Product, type: string) => void;
  handleQuantity: (index: number, action: string) => void;
  cartTotal: number;
  handleCheckout: (addressee: Addressee) => void;
}

export const defaultValues = {
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  handleQuantity: () => {},
  calcCartTotal: () => {},
  cartTotal: 0,
  handleCheckout: () => {},
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
