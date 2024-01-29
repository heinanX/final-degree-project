/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Product,
  ProductContext,
  defaultValues,
} from "../interfaces/product.interface";
import { CategoryTwo } from "../interfaces/category.interface";
import { Tags } from "../interfaces/tags.interface";

export const ProductContextValues =
  createContext<ProductContext>(defaultValues);

export const useSocket = () => useContext(ProductContextValues);

//---------------------- Provider begins here

function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [getMovie, setgetMovie] = useState<Product | null>(null);
  const [viewProductDetails, setViewProductDetails] = useState<Product | null>(
    null
  );
  // const {getCategory } = categorySocket();

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch product");
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  /*
   * Fetches a product from the database, retrieves category IDs and Tag IDs,
   * and fetches the names of the corresponding categories and tags.
   * Then, updates the state with the product data, tags and category names.
   */
  const getProduct = async (id: string) => {
    try {
      // FETCH PRODUCT FROM DATABASE
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      console.log(response);

      const data = await response.json();
      console.log(data);

      if (!response.ok) throw new Error("Failed to fetch product");

      //SAVE CATEGORIES INTO A SEPARATE VARIABLE AND FETCH EACH CATEGORY'S NAME
      const categoryIds = data.category;
      console.log(categoryIds);

      const categoryData = await Promise.all(
        categoryIds.map(async (categoryId: CategoryTwo) => {
          const categoryRes = await fetch(`/api/categories/${categoryId}`);
          const category = await categoryRes.json();
          return category;
        })
      );

      //SAVE CATEGORIES INTO A SEPARATE VARIABLE AND FETCH EACH CATEGORY'S NAME
      const tagIds = data.tags;

      const tagData = await Promise.all(
        tagIds.map(async (tagId: Tags) => {
          const tagRes = await fetch(`/api/tags/${tagId}`);
          const tag = await tagRes.json();
          return tag;
        })
      );

      setgetMovie({ ...data, category: categoryData, tags: tagData });
    } catch (err) {
      console.log(err);
    }
  };

  const getProductBySearchCriteria = async (id: string, criteria: string) => {
try {
  const res = await fetch(`/api/products/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
            [criteria]: {  $in: [id] }
          }),
  });
  const data = await res.json();
  if (res.ok) {
    console.log('this is from the response', data);
  }
} catch (err) {
  if (err instanceof Error) {
    console.error(err);
  }
}
  }

  //STATE TO STORE UPDATED INFO WHEN IN EDIT MODE
  const [newUpdatedProduct, setNewUpdatedProduct] = useState<object | null>(
    null
  );

  const updateProduct = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | object,
    property: string
  ) => {
    const targetValue =
      property === "description"
        ? (e as React.ChangeEvent<HTMLTextAreaElement>).target.value
        : (e as React.ChangeEvent<HTMLInputElement>).target.value;
    setNewUpdatedProduct((prevState) => ({
      ...prevState,
      [property]: targetValue,
    }));
  };

  const updateProductDatabase = async (updateProductObject: object, id: string) => {
    try {
      const res = await fetch(`/api/products/edit-product/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProductObject),
      });
      const data = await res.json();
      if (res.ok) {
        console.log('this is from the response', data);
        setViewProductDetails(data);
        getProducts();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching product", err.message);
      }
    }
  };

  useEffect(() => {
    getProducts();

    // getProductBySearchCriteria('65a2af52719aaaf33cdf52d3','category')
  }, []);

  return (
    <ProductContextValues.Provider
      value={{
        products,
        setProducts,
        getProducts,
        getProduct,
        getMovie,
        getProductBySearchCriteria,
        viewProductDetails,
        setViewProductDetails,
        newUpdatedProduct,
        setNewUpdatedProduct,
        updateProduct,
        updateProductDatabase
      }}
    >
      {children}
    </ProductContextValues.Provider>
  );
}

export default ProductProvider;
