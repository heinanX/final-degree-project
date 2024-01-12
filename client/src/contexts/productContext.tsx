/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Product, ProductContext } from "../interfaces/product_interface";
import { Category } from "../interfaces/categories_interface";


const defaultValues = {
  products: [],
  setProducts: () => {},
  getProducts: () => {},
  categories: [],
  setCategories: () => {},
  getCategories: () => {},
};

export const ProductContextValues =
  createContext<ProductContext>(defaultValues);

export const useSocket = () => useContext(ProductContextValues);

//---------------------- Provider begins here

function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

 
  const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();

    setProducts(data);
    console.log(data);
    
  };

  const getCategories = async () => {
    const res = await fetch("http://localhost:3000/api/categories");
    const data = await res.json();

    setCategories(data);
    console.log(data);
    
  };


  return (
    <ProductContextValues.Provider
      value={{
        products,
        setProducts,
        getProducts,
        categories,
        getCategories
      }}
    >
      {children}
    </ProductContextValues.Provider>
  );
}

export default ProductProvider;