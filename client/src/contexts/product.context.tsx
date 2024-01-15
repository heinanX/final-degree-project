/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product, ProductContext } from "../interfaces/product.interface";
import { CategoryTwo } from "../interfaces/category.interface";
import { Tags } from "../interfaces/tags.interface";

const defaultValues = {
  products: [],
  setProducts: () => {},
  getProducts: () => {},
  getProduct: () => {},
  getMovie: null,
};

export const ProductContextValues =
  createContext<ProductContext>(defaultValues);

export const useSocket = () => useContext(ProductContextValues);

//---------------------- Provider begins here

function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [getMovie, setgetMovie] = useState<Product | null>(null);

  const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();

    setProducts(data);
  };

  /*
   * Fetches a product from the database, retrieves category IDs and Tag IDs,
   * and fetches the names of the corresponding categories and tags.
   * Then, updates the state with the product data, tags and category names.
   */
  const getProduct = async (id: string) => {
    try {
      // FETCH PRODUCT FROM DATABASE
      const res = await fetch(`api/products/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch product");

      //SAVE CATEGORIES INTO A SEPARATE VARIABLE AND FETCH EACH CATEGORY'S NAME
      const categoryIds = data.category;

      const categoryData = await Promise.all(
        categoryIds.map(async (categoryId: CategoryTwo) => {
          const categoryRes = await fetch(`api/categories/${categoryId}`);
          return categoryRes.json();
        })
      );

      //SAVE CATEGORIES INTO A SEPARATE VARIABLE AND FETCH EACH CATEGORY'S NAME
      const tagIds = data.tags;

      const tagData = await Promise.all(
        tagIds.map(async (tagId: Tags) => {
          const tagRes = await fetch(`api/tags/${tagId}`);
          return tagRes.json();
        })
      );

      setgetMovie({ ...data, category: categoryData, tags: tagData });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContextValues.Provider
      value={{
        products,
        setProducts,
        getProducts,
        getProduct,
        getMovie,
      }}
    >
      {children}
    </ProductContextValues.Provider>
  );
}

export default ProductProvider;
