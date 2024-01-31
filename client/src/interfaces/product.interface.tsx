import { Category } from "./category.interface";

export interface ProductContext {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getProducts: () => void;
  getProduct: (id: string) => void;
  getMovie: Product | null;
  getProductBySearchCriteria: (id: string, criteria: string) => void;
  viewProductDetails: Product | null;
  setViewProductDetails: React.Dispatch<React.SetStateAction<Product | null>>;
  newUpdatedProduct: object | null;
  setNewUpdatedProduct: React.Dispatch<React.SetStateAction<object | null>>;
  updateProduct: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    property: string
  ) => void;
  updateProductDatabase: (updateProductObject: object, id: string) => void;
  relatedProducts: Product[];
  setRelatedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const defaultValues = {
  products: [],
  setProducts: () => {},
  getProducts: () => {},
  getProduct: () => {},
  getMovie: null,
  getProductBySearchCriteria: () => {},
  viewProductDetails: null,
  setViewProductDetails: () => {},
  newUpdatedProduct: null,
  setNewUpdatedProduct: () => {},
  updateProduct: () => {},
  updateProductDatabase: () => {},
  relatedProducts: [],
  setRelatedProducts: () => {},
};

export interface iProductVhs {
  price: number;
  available: boolean;
  quantity: number;
  inStock: number;
  stripe_price_id: string;
  stripe_prod_id: string;
}

export interface iProductDigital {
  price: number;
  available: boolean;
  stripe_price_id: string;
  stripe_prod_id: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  /* category: string[]; */
  category: Category[];
  tags: [];
  content_rating: string;
  rating: number;
  year: number;
  image: string;
  vhs: iProductVhs;
  digital: iProductDigital;
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
