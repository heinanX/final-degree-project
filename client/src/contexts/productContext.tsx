/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Product, ProductContext } from "../interfaces/product_interface";


const defaultValues = {
  products: [],
  setProducts: () => {},
  getProducts: () => {},
};

export const ProductContextValues =
  createContext<ProductContext>(defaultValues);

export const useSocket = () => useContext(ProductContextValues);

//---------------------- Provider begins here

function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);

 
  const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();

    setProducts(data);
    console.log(data);
    
  };

  return (
    <ProductContextValues.Provider
      value={{
        products,
        setProducts,
        getProducts,
      }}
    >
      {children}
    </ProductContextValues.Provider>
  );
}

export default ProductProvider;