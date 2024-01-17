import { Product } from "./product.interface";

export interface CartContext {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  addToCart: (product: Product, type: string) => void;
}

export interface CartItem {
  product: Product;
  quantity: number;
  vhs: boolean;
  digital: boolean;
}