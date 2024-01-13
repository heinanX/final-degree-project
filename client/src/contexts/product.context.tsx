/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Product, ProductContext } from "../interfaces/product.interface";
import { Category } from "../interfaces/categories.interface";
import { Tag, Tags } from "../interfaces/tags.interface";


const defaultValues = {
  products: [],
  setProducts: () => {},
  getProducts: () => {},
  categories: [],
  setCategories: () => {},
  getCategories: () => {},
  tags: [],
  setTags: () => {},
  getTags: () => {},
  getTag: () => {},
};

export const ProductContextValues =
  createContext<ProductContext>(defaultValues);

export const useSocket = () => useContext(ProductContextValues);

//---------------------- Provider begins here

function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

 
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
  };

  const getTags = async () => {
    const res = await fetch("http://localhost:3000/api/tags");
    const data = await res.json();

    setTags(data);    
  };

  const getTag = async (tag: string) => {
    const res = await fetch("http://localhost:3000/api/tags");
    const data = await res.json();

const collected = data.find((item: Tags) => item.tag === tag);

if (!collected) {
  const createTagRes = await fetch("/api/tags/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag: tag
    })
  });
  if (createTagRes.ok) {
    const newTag = await createTagRes.json();
    console.log(newTag);
  }
}
    console.log(collected);  
  };


  return (
    <ProductContextValues.Provider
      value={{
        products,
        setProducts,
        getProducts,
        categories,
        getCategories,
        tags,
        getTags,
        getTag
      }}
    >
      {children}
    </ProductContextValues.Provider>
  );
}

export default ProductProvider;