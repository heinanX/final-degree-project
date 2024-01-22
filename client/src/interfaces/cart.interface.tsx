import { Product } from "./product.interface";

export interface CartContext {
  addToCart: (product: Product, type: string) => void;
  handleQuantity: (index: number, action: string) => void;
  handleCheckout: (addressee: Addressee) => void;
  newCart: Cart
  setNewCart: React.Dispatch<React.SetStateAction<Cart>>
}

export const defaultValues = {
  addToCart: () => {},
  handleQuantity: () => {},
  handleCheckout: () => {},
  newCart: {
    cart: [],
    total_price: 0,
    address:  {
      cust_name: '',
      street: '',
      zip_code: '',
      city: '' 
    }
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
  address: Addressee
}

