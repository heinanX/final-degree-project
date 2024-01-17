export interface ProductContext {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getProducts: () => void;
  getProduct: (id:string) => void;
  getMovie: Product | null
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: [];
  tags: [];
  content_rating: string;
  rating: number;
  year: number;
  image: string;
  vhs: {
    price: number;
    available: boolean;
    quantity: number;
    inStock: number;
    stripe_price_id: string;
    stripe_prod_id: string;
  };
  digital: {
    price: number;
    available: boolean;
    stripe_price_id: string;
    stripe_prod_id: string;
  };
}

export interface ProductSegment {
  title: string;
  description: string;
  category: [];
  tags: [];
  content_rating: string;
  rating: number;
  year: number;
  image: string;
  vhs: {
    price: number;
    quantity: number;
  };
  digital: {
    price: number;
  };
}


